const { getPrerequisites, getStudentByRut, getLevelStudent, getCoursesStudent, getAverageApproved } = require("./getInformation");

class StudyPlain {
    constructor() {
        this.semesters = [];
    }

    appendSemester(semester) {
        this.semesters.push(semester);
    }
}
class Semester {
    constructor() {
        this.semester = null;
        this.courses = [];
    }

    setSemester(semester) {
        this.semester = semester;
    }

    appendCourse(course) {
        this.courses.push(course);
    }

    getCourseBySemester(semester) {
        let coursesN = [];
        this.courses.forEach((c) => {
            if (c.semester === semester) {
                coursesN.push(c);
            }
        });
        return coursesN;
    }

    setApproved(approved) {
        this.courses.forEach((c) => {
            c.approved = approved;
        });
    }

    getCourseByCod(cod) {
        let course = null
        this.courses.forEach((c) => {
            if (c.cod === cod) {
                course = c;
            }
        });
        return course;
    }

    existCourse(cod) {
        this.courses.forEach((c) => {
            if (c.cod === cod) {
                return true;
            }
        });
    }

    size() {
        return this.courses.length;
    }

    toString() {
        let out = '';
        this.courses.forEach((c) => out += c.toString() + '\n');
        return out;
    }
}

class Course {
    constructor(cod, name, credit, semester, approved) {
        this.cod = cod;
        this.name = name;
        this.credit = credit;
        this.semester = semester;
        this.approved = approved;
    }
    toString() {
        return `cod ${this.cod}, name ${this.name}, credit ${this.credit}, semester ${this.semester}, approved ${this.approved}`;
    }
}
class Student {
    constructor(rut, cod_plain, year) {
        this.rut = rut;
        this.cod_plain = cod_plain;
        this.year = year;
        this.level = null;
    }

    setLevel(level) {
        this.level = level;
    }
}


class Node {
    constructor(asignatures) {
        this.asignatures = asignatures;
        this.next = null;
        this.g = 0;
        this.h = -1;
        this.f = 0;
    }

    setNext(next) {
        this.next = next;
    }
}
class Algorithm {
    constructor(student, prerequisites, level, coursesAvailables, averageApproved) {
        this.student = student;
        this.prerequisites = prerequisites;
        this.level = level;
        this.coursesAvailables = coursesAvailables;
        this.averageApproved = averageApproved;
        this.student.setLevel(this.level);
    }

    prerequisite(cod_course, cod_course_pre) {
        return (pre.findIndex(
            i => i.cod_course === cod_course && i.cod_course_pre === cod_course_pre
            ) > -1
        ) ? true : false;
    }

    heuristic(node) {
        return node.asignatures.courses[0].credit - 30;
    }

    appendCoursesInit(asignatures) {
        this.coursesAvailables.courses.forEach((c) => {
            if (c.semester === this.student.level && !c.approved) {
                asignatures.appendCourse(c);
            };
        });
    }


    searchPrereq(cod) {
        const list = [];
        this.prerequisites.forEach((prereq) => {
            if (prereq.cod_course === cod) {
                list.push(prereq.cod_course_pre);
            }
        });
        return list;
    }

    getNewLevelStudent() {
        let level = this.student.level + 1;
        this.coursesAvailables.courses.forEach((c) => {
            if (!c.approved) {
                if (c.semester < level) {
                    level = c.semester;
                };
            };
        });
        return level;
    }

    executeAlgorithm(open_nodes, close_nodes) {
        while (open_nodes.length > 0) {
            let i = 0;
            open_nodes.map((n, index) => {
                if (n.f < open_nodes[0].f) {
                    i = index;
                }
            });
            let current = open_nodes.pop(i);
            if (current.h == 0) {
                if(current.next == null)
                    return current;
                return current;
            }

            close_nodes.push(current);
            const successor = [];
            let sum = 0;
            const nextAsignatures = new Semester();
            let j = this.student.level;
            while (sum < this.averageApproved && j < this.student.level + 2) {
                this.coursesAvailables.getCourseBySemester(j).forEach((co) => {
                    if (!co.approved) {
                        const listPrer = this.searchPrereq(co.cod);
                        let approved = true;
                        
                        listPrer.forEach((cod) => {
                            let c = this.coursesAvailables.getCourseByCod(cod);
                            if (!c.approved) {
                                approved = false;
                            }
                        });
                        
                        if (approved) {
                            if (co.credit === 30 && this.student.level === co.semester) {
                                nextAsignatures.appendCourse(co);
                                sum = 30;
                            } else {
                                if (this.averageApproved >= (sum + co.credit)) {
                                    nextAsignatures.appendCourse(co);
                                    sum += co.credit;
                                }
                            }
                        }
                    }
                });
                j++;
            }

            nextAsignatures.setApproved(true);
            this.student.level = this.getNewLevelStudent();
            successor.push(new Node(nextAsignatures));
            
            successor.forEach((succ) => {
                let g = current.g + 1;
                let best = false;
                if (!(succ in open_nodes)) {
                    succ.h = this.heuristic(succ);
                    open_nodes.push(succ);
                    best = true;
                } else if (current.g < succ.g) {
                    best = true;
                }

                if (best)
                    succ.next = current
                    succ.g = g;
                    succ.f = succ.g + succ.h;
            });
        }

    }

    run() {
        const asignatures = new Semester();
        this.appendCoursesInit(asignatures);
        const init_node = new Node(asignatures);
        const open_nodes = [];
        const close_nodes = [];
        open_nodes.push(init_node);
        return this.executeAlgorithm(open_nodes, close_nodes);
    }
}

const getCourses = async (rut) => {
    const coursesA = new Semester();
    const courses = await getCoursesStudent(rut);
    courses.forEach((c) => {
        coursesA.appendCourse(new Course(c.cod, c.name, c.credit, c.semester, c.approved));
    });

    return coursesA
}

exports.execute = async (rut) => {
    try {        
        const infoStudent = await getStudentByRut(rut);
        const student = new Student(infoStudent.rut_person, infoStudent.cod_plain, infoStudent.year);
        const prerequisites = await getPrerequisites(student.cod_plain);
        const level = await getLevelStudent(student.rut);
        const coursesAvailables = await getCourses(student.rut);
        const averageApproved = await getAverageApproved(student.rut);
        a = new Algorithm(student, prerequisites, level.level, coursesAvailables, averageApproved.average_approval);
        let aux = level.level;
        let current = a.run();
        let study_plain = new StudyPlain();
        while (current.next != null) {
            current.asignatures.setSemester(aux);
            study_plain.appendSemester(current.asignatures);
            aux++;
            current = current.next;
        }

        return study_plain;
    } catch (err) {
        console.log(err)
    }
}