const { getPrerequisites, getStudentByRut, getLevelStudent, getCoursesStudent, getAverageApproved, getMaxSemester } = require("./getInformation");

class StudyPlain {
    constructor() {
        this.semesters = [];
    }
    
    appendSemester(semester) {
        this.semesters.push(semester);
    }

    existCapstoneProject() {
        let exist = false;
        this.semesters.forEach((s) => {
            s.courses.forEach((c) => {
                if (c.credit == 30) {
                    exist = true;
                }
            })
        });
        return exist
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
    constructor(student, prerequisites, level, coursesAvailables, averageApproved, dispersion) {
        this.student = student;
        this.prerequisites = prerequisites;
        this.level = level;
        this.coursesAvailables = coursesAvailables;
        this.averageApproved = averageApproved;
        this.dispersion = dispersion;
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
    


    searchPrereq(cod) {
        const list = [];
        this.prerequisites.forEach((prereq) => {
            if (prereq.cod_course === cod) {
                list.push(prereq.cod_course_pre);
            }
        });
        return list;
    }


    returnSolution(current) {
        if(current.next == null) {
            return current;
        }
        while (current.next.next != null) {
            current = current.next;
        }
        return current;
    }

    getNextAsignatures() {
        let sum = 0;
        const nextAsignatures = new Semester();
        let j = this.student.level;
        let currentSemester = 1;
        while (sum < this.averageApproved && j < this.student.level + this.dispersion
            ) {
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
                        console.log(currentSemester % 2);
                        if ((currentSemester % 2 == 0) && (co.semester % 2 == 0)) {
                            if (co.credit === 30 && this.student.level === co.semester) {
                                nextAsignatures.appendCourse(co);
                                sum = 30;
                            } else {
                                if (this.averageApproved >= (sum + co.credit)) {
                                    nextAsignatures.appendCourse(co);
                                    sum += co.credit;
                                }
                            }
                        } else if ((currentSemester % 2 != 0) && (co.semester % 2 != 0)) {
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
                }
            });
            if (currentSemester === 1) {
                currentSemester = 2;
            } else {
                currentSemester = 1;
            }
            j++;
        }

        return nextAsignatures;
    }

    setSuccesor(successor, open_nodes, current) {
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
                return this.returnSolution(current);
            }
            close_nodes.push(current);
            
            const successor = [];

            let nextAsignatures = this.getNextAsignatures();

            nextAsignatures.setApproved(true);
            this.student.level = setNewLevelStudent(this.coursesAvailables);
            successor.push(new Node(nextAsignatures));
            this.setSuccesor(successor, open_nodes, current);
        }

    }

    run(asignatures) {        
        const init_node = new Node(asignatures);
        const open_nodes = [];
        const close_nodes = [];
        open_nodes.push(init_node);
        return this.executeAlgorithm(open_nodes, close_nodes);
    }
}

const getCourses = async (rut, cod_study_plain) => {
    const coursesA = new Semester();
    const courses = await getCoursesStudent(rut, cod_study_plain);
    courses.forEach((c) => {
        coursesA.appendCourse(new Course(c.cod, c.name, c.credit, c.semester, c.approved));
    });

    return coursesA
}

const appendCoursesInit = (coursesAvailables, level) => {
    const asignatures = new Semester();
    coursesAvailables.courses.forEach((c) => {
        if (c.semester === level && c.approved) {
            asignatures.appendCourse(c);
        };
    });
    return asignatures;
}

const getNewLevelStudent = (coursesAvailables, student) => {
    let level = student.level + 1;
    coursesAvailables.courses.forEach((c) => {
        if (!c.approved) {
            if (c.semester < level) {
                level = c.semester;
            };
        };
    });
    return level;
}

const setNewLevelStudent = (coursesAvailablesAux) => {
    let level = 9999
    coursesAvailablesAux.courses.forEach((c) => {
        if (!c.approved) {
            if(c.semester < level) {
                level = c.semester;
            }
        }
    });
    return level
}

const setCoursesApproved = (coursesAvailablesAux, asignatures) => {
    coursesAvailablesAux.courses.forEach((c) => {
        asignatures.courses.forEach((a) => {
            if (c.cod == a.cod) {
                c.approved = true;
            }
        })
    })
}

const updateCoursesAvailable = (coursesAvailablesAux) => {
    const asignatures = new Semester();
    coursesAvailablesAux.courses.forEach((c) => {
        asignatures.appendCourse(new Course(c.cod, c.name, c.credit, c.semester, c.approved));
    });
    return asignatures;
}

exports.getSemesterStudent = async (rut, isAverageApproval, dispersions) => {
    try {        
        const infoStudent = await getStudentByRut(rut);
        const student = new Student(infoStudent.rut_person, infoStudent.cod_plain, infoStudent.year);
        const prerequisites = await getPrerequisites(student.cod_plain);
        const level = await getLevelStudent(student.rut, student.cod_plain);
        let coursesAvailables = await getCourses(student.rut, student.cod_plain);
        const coursesAvailablesAux = await getCourses(student.rut, student.cod_plain);
        const averageApproved = isAverageApproval ? 30 : await getAverageApproved(student.rut);
        const algorithm = new Algorithm(student, prerequisites, level.level, coursesAvailables, averageApproved, dispersions);
        let aux = level.level;
        let asignatures = appendCoursesInit(coursesAvailables, level.level);
        let study_plain = new StudyPlain();
        while (!study_plain.existCapstoneProject()) {
            current = algorithm.run(asignatures);
            //console.log(`g: ${current.g} h: ${current.h}`);
            asignatures = current.asignatures
            setCoursesApproved(coursesAvailablesAux, asignatures);
            algorithm.coursesAvailables = updateCoursesAvailable(coursesAvailablesAux);
            asignatures.semester = aux;
            study_plain.appendSemester(asignatures);
            student.level = setNewLevelStudent(coursesAvailablesAux);
            aux++;
        }
        return study_plain;
    } catch (err) {
        console.log(err)
    }
}
