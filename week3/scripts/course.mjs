const byuiCourse = {
    code: "WDD 231",
    name: "Web Frontend Development I",
    sections: [
        {
            sectionNum: 1,
            roomNum: "STC 353",
            enrolled: 26,
            days: "TTh",
            instructor: "Brother Gordon"
        },
        {
            sectionNum: 2,
            roomNum: "STC 347",
            enrolled: 25,
            days: "TTh",
            instructor: "Sister Cardon"
        },
        {
            sectionNum: 3,
            roomNum: "Online",
            enrolled: 28,
            days: "Online",
            instructor: "Brother Adams"
        }
    ],
    changeEnrollment(sectionNum, add = true) {
        const sectionIndex = this.sections.findIndex((section) => section.sectionNum === sectionNum);

        if (sectionIndex >= 0) {
            if (add) {
                this.sections[sectionIndex].enrolled += 1;
            } else if (this.sections[sectionIndex].enrolled > 0) {
                this.sections[sectionIndex].enrolled -= 1;
            }
        }
    }
};

export default byuiCourse;
