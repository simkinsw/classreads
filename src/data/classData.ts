export type ClassData = Map<string, User[]>;

export type User = {
    name: string;
    type: string;
} 

const room211Students = ["Akthar", "Alexa", "Amen", "Aroush", "Aziza", "Bella", "Brian", "Dalila", "Dalilah", "Ella", "Feroza", 
"Guadalupe", "Gus", "Ibrahim", "Jahzeel", "Janet", "Kamila", "Kawther", "Kimiyai", "Kymbella", "Majidah", "Marcus", "Mashal", 
"Modade", "Murtuza", "Nur Syairah", "Rachel", "Reem", "Sohila", "Subhan", "Warsan", "Yasmeen"];

const room211StudentUsers = room211Students.map((name) => {
    return { name, type: "student" }
});

//TODO: which titles to use here
const room211TeacherUsers = [{ name: "Ms. DeHaan", type: "teacher" }, { name: "Ms. Dougherty", type: "teacher" }];

const classMap: ClassData = new Map<string, User[]>([
    ["room211", room211StudentUsers],
    ["room211teacher", room211TeacherUsers]
]);

export default classMap;

export const getStudentList = (classCode: string) => {
    if (!classMap.has(classCode) || classCode.includes("teacher")) return []

    return [
        ...classMap.get(classCode)!.map(student => student.name),
        ...classMap.get(classCode + "teacher")!.map(teacher => teacher.name)
    ]
}

