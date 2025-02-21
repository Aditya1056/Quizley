import { useCallback, useState, useEffect } from "react";

const quizSectionA = [
    {
        id:"A_1",
        q:"Which planet is closest to the Sun?",
        options:["Venus", "Mercury", "Earth", "Mars"],
        correct:"Mercury"
    },
    {
        id:"A_2",
        q:"Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
        options:["Stack", "Tree", "Queue", "Graph"],
        correct:"Queue"
    },
    {
        id:"A_3",
        q:"Which of the following is primarily used for structuring web pages?",
        options:["HTML", "Python", "Java", "C++"],
        correct:"HTML"
    },
    {
        id:"A_4",
        q:"Which chemical symbol stands for Gold?",
        options:["Au", "Ag", "Gd", "Gl"],
        correct:"Au"
    },
    {
        id:"A_5",
        q:"Which of these processes is not typically involved in refining petroleum?",
        options:["Fractional Distillation", "Cracking", "Polymerization", "Filtration"],
        correct:"Filtration"
    },
];

const quizSectionB = [
    {
        id:"B_1",
        q:"What is the value of 38 + 176?",
        correct:"214"
    },
    {
        id:"B_2",
        q:"How many states are present in United States?",
        correct:"50"
    },
    {
        id:"B_3",
        q:"In which year was the Declaration of Independence signed?",
        correct:"1776"
    },
    {
        id:"B_4",
        q:"What is the value of pi rounded to the nearest integer?",
        correct:"3"
    },
    {
        id:"B_5",
        q:"If a car travels at 60 mph for 2 hours, how many miles does it travel?",
        correct:"120"
    },
];

const getDB = (mode) => {

    return new Promise((resolve) => {

        const request = indexedDB.open('quizley');
    
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("tests", { keyPath: 'id' });
        }
    
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction("tests", mode);
            const testsTable = tx.objectStore("tests");
            resolve(testsTable);
        }
    });
}

const useAuth = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [tests, setTests] = useState([]);
    const [sectionA, setSectionA] = useState(quizSectionA);
    const [sectionB, setSectionB] = useState(quizSectionB);

    const enter = useCallback(async (name, userTests) => {

        setUsername(name);

        if(userTests){
            setTests(userTests);
        }

        localStorage.setItem('username', JSON.stringify(name));

        const testsTable = await getDB("readwrite");

        if(userTests){
            for(let x of userTests){
                testsTable.add(x);
            }
        }

    }, []);

    const addTest = useCallback(async (test) => {

        setTests((prev) => {
            let newTests = [test, ...prev];
            return newTests;
        });

        const testsTable = await getDB("readwrite");
        testsTable.add(test);
    }, []);

    useEffect(() => {

        const handler = async () => {

            const username = JSON.parse(localStorage.getItem('username'));
    
            const userTests = [];
    
            const testsTable = await getDB("readonly");
    
            const req = testsTable.openCursor();
    
            req.onsuccess = event => {
    
                const cursor = event.target.result;
    
                if(cursor){
                    userTests.unshift(cursor.value);
                    cursor.continue();
                }

                if(username){
                    enter(username, userTests);
                }
    
                setIsLoading(false);
            }
        }

        handler();

    }, [enter]);

    return {
        isLoading,
        username,
        tests,
        sectionA,
        sectionB,
        enter,
        addTest
    };
}

export default useAuth;