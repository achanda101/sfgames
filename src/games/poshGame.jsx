import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, RefreshCcw } from 'lucide-react';
import './game.css';



const PoshGame = () => {
    const [ gameState, setGameState ] = useState('intro');
    const [ currentScenario, setCurrentScenario ] = useState(0);
    const [ poshPoints, setPoshPoints ] = useState(10);
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const [ answerSubmitted, setAnswerSubmitted ] = useState(false);
    const [ scenarioResponses, setScenarioResponses ] = useState([]);

    // Use refs to track the latest values for calculations
    const poshPointsRef = useRef(poshPoints);

    // Update refs when state changes
    useEffect(() => {
        poshPointsRef.current = poshPoints;
    }, [ poshPoints ]);


    const scenarios = [
        {
            id: 1,
            title: "The Persistent Physical Contact",
            title_kan: "ಬೇಡದ ದೈಹಿಕ ಸ್ಪರ್ಶ",
            description: "A colleague constantly intentionally bumps into you every time they see you around. Despite asking them why they do this, they simply claim that it was an accident.",
            description_kan: "ಒಬ್ಬ ಸಹೋದ್ಯೋಗಿ ನಿಮ್ಮನ್ನು ನೋಡಿದಾಗಲೆಲ್ಲಾ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ನಿಮ್ಮೊಂದಿಗೆ ಘರ್ಷಣೆ ಮಾಡುತ್ತಿರುತ್ತಾನೆ. ಅವರು ಹೀಗೆ ಏಕೆ ಮಾಡುತ್ತಾರೆ ಎಂದು ಕೇಳಿದರೂ, ಅವರು ಇದು ಅಪಘಾತ ಎಂದು ಹೇಳಿಕೊಳ್ಳುತ್ತಾರೆ.",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "Leave it be since they said it is an accident.",
                    text_kan: "ಅದು ಅಪಘಾತ ಎಂದು ಅವರು ಹೇಳಿದ್ದರಿಂದ ಅದನ್ನು ಹಾಗೆಯೇ ಬಿಡಿ.",
                    feedback: "Incorrect. POSH policies are designed to address all unwelcome acts, reporting such behaviour safeguards not just you but also other employees from the perpetrator’s misconduct.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. POSH ನೀತಿಗಳು ಎಲ್ಲಾ ಅಹಿತಕರ ಕೃತ್ಯಗಳನ್ನು ಪರಿಹರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ, ಅಂತಹ ನಡವಳಿಕೆಯನ್ನು ವರದಿ ಮಾಡುವುದರಿಂದ ನಿಮ್ಮನ್ನು ಮಾತ್ರವಲ್ಲದೆ ಇತರ ಉದ್ಯೋಗಿಗಳನ್ನು ಸಹ ಅಪರಾಧಿಯ ದುಷ್ಕೃತ್ಯದಿಂದ ರಕ್ಷಿಸುತ್ತದೆ.",
                    poshPoints: -1,
                },
                {
                    text: "Report this to a supervisor and take the necessary steps forward.",
                    text_kan: "ಇದನ್ನು ಮೇಲ್ವಿಚಾರಕರಿಗೆ ವರದಿ ಮಾಡಿ ಮತ್ತು ಅಗತ್ಯ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1,
                },
                {
                    text: "Tell other colleagues about the issue.",
                    text_kan: "ಈ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ಇತರ ಸಹೋದ್ಯೋಗಿಗಳಿಗೆ ತಿಳಿಸಿ.",
                    feedback: "Incorrect. Discussing the issue with others can breach confidentiality and undermine the investigation.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇತರರೊಂದಿಗೆ ಸಮಸ್ಯೆಯನ್ನು ಚರ್ಚಿಸುವುದು ಗೌಪ್ಯತೆಯನ್ನು ಉಲ್ಲಂಘಿಸಬಹುದು ಮತ್ತು ತನಿಖೆಯನ್ನು ದುರ್ಬಲಗೊಳಿಸಬಹುದು.",
                    poshPoints: -1,
                },
                {
                    text: "Confront the colleague aggressively in the office.",
                    text_kan: "ಚೇರಿಯಲ್ಲಿ ಸಹೋದ್ಯೋಗಿಯನ್ನು ಆಕ್ರಮಣಕಾರಿಯಾಗಿ ಎದುರಿಸಿ.",
                    feedback: "Incorrect. Aggressive confrontation can increase the risk of retaliation, which compromises your safety. It can also breach the integrity of the investigation, which is designed to be impartial.",
                    feedback_kan: "ಆಕ್ರಮಣಕಾರಿ ಮುಖಾಮುಖಿಯು ಪ್ರತೀಕಾರದ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸಬಹುದು, ಇದು ನಿಮ್ಮ ಸುರಕ್ಷತೆಯನ್ನು ಅಪಾಯಕ್ಕೆ ಸಿಲುಕಿಸುತ್ತದೆ. ಇದು ನಿಷ್ಪಕ್ಷಪಾತವಾಗಿರಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ತನಿಖೆಯ ಸಮಗ್ರತೆಯನ್ನು ಸಹ ಉಲ್ಲಂಘಿಸಬಹುದು.",
                    poshPoints: -1,
                }
            ]
        },
        {
            id: 2,
            title: "Inappropriate Personal Questions from a Superior",
            title_kan: "ಮೇಲಧಿಕಾರಿಯಿಂದ ಅನುಚಿತ ವೈಯಕ್ತಿಕ ಪ್ರಶ್ನೆಗಳು",
            description: "Shanta constantly asks her subordinate Raj extremely personal questions about his sex life.",
            description_kan: "ಶಾಂತಾ ತನ್ನ ಅಧೀನ ಅಧಿಕಾರಿ ರಾಜ್‌ಗೆ ಅವನ ಲೈಂಗಿಕ ಜೀವನದ ಬಗ್ಗೆ ಅತ್ಯಂತ ವೈಯಕ್ತಿಕ ಪ್ರಶ್ನೆಗಳನ್ನು ನಿರಂತರವಾಗಿ ಕೇಳುತ್ತಾಳೆ.",
            question: "What should Raj do?",
            question_kan: "ರಾಜ್ ಏನು ಮಾಡಬೇಕು?",
            options: [
                {
                    text: "Just answer her questions even though it makes him uncomfortable since she’s his superior",
                    text_kan: "ಅವಳು ಅವನ ಮೇಲಧಿಕಾರಿಯಾಗಿರುವುದರಿಂದ ಅದು ಅವನಿಗೆ ಅನಾನುಕೂಲವನ್ನುಂಟುಮಾಡಿದರೂ ಸಹ ಅವಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",
                    feedback: "Incorrect. The office is supposed to be a safe space for all employees, you should not feel pressured to respond to someone at the cost of your comfort.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಕಚೇರಿ ಎಲ್ಲಾ ಉದ್ಯೋಗಿಗಳಿಗೆ ಸುರಕ್ಷಿತ ಸ್ಥಳವಾಗಿರಬೇಕು, ನಿಮ್ಮ ಸೌಕರ್ಯವನ್ನು ಪಣಕ್ಕಿಟ್ಟು ಯಾರಿಗಾದರೂ ಪ್ರತಿಕ್ರಿಯಿಸಲು ನೀವು ಒತ್ತಡಕ್ಕೊಳಗಾಗಬಾರದು.",
                    poshPoints: -1,
                },
                {
                    text: "Tell her that it makes him feel uncomfortable and sternly ask her to stop, and report the behaviour.",
                    text_kan: "ಅದು ಅವನಿಗೆ ಅನಾನುಕೂಲವನ್ನುಂಟುಮಾಡುತ್ತದೆ ಎಂದು ಅವಳಿಗೆ ಹೇಳಿ ಮತ್ತು ಅವಳನ್ನು ನಿಲ್ಲಿಸಲು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಕೇಳಿ ಮತ್ತು ನಡವಳಿಕೆಯನ್ನು ವರದಿ ಮಾಡಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1,
                },
                {
                    text: "Threaten her to not repeat it.",
                    text_kan: "ಅದನ್ನು ಪುನರಾವರ್ತಿಸದಂತೆ ಅವಳನ್ನು ಬೆದರಿಸಿ.",
                    feedback: "Incorrect. Threatening can itself be registered as a complaint that undermines the credibility of Raj’s complaint.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಬೆದರಿಕೆ ಹಾಕುವುದನ್ನು ರಾಜ್ ದೂರಿನ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ಹಾಳುಮಾಡುವ ದೂರಾಗಿ ನೋಂದಾಯಿಸಬಹುದು.",
                    poshPoints: -1,
                },
                {
                    text: "Delay the reporting of the issue and report it only when it gets out of hand.",
                    text_kan: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡುವುದನ್ನು ವಿಳಂಬ ಮಾಡಿ ಮತ್ತು ಅದು ಕೈ ಮೀರಿದಾಗ ಮಾತ್ರ ವರದಿ ಮಾಡಿ.",
                    feedback: "Incorrect. Delayed reporting can make it harder to gather evidence and move forward with an investigation.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ವಿಳಂಬವಾದ ವರದಿ ಮಾಡುವಿಕೆಯು ಪುರಾವೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಲು ಮತ್ತು ತನಿಖೆಯೊಂದಿಗೆ ಮುಂದುವರಿಯಲು ಕಷ್ಟಕರವಾಗಿಸುತ್ತದೆ.",
                    poshPoints: -1,
                }
            ]
        },
        {
            id: 3,
            title: "Unwanted Staring Between Colleagues",
            title_kan: "ಸಹೋದ್ಯೋಗಿಗಳ ನಡುವೆ ಅನಪೇಕ್ಷಿತ ನೋಟ",
            description: "Neha’s colleague and friend, Jayesh always suggestively stares at her when he sees her in the elevator or in other places of the office.",
            description_kan: "ನೇಹಾಳ ಸಹೋದ್ಯೋಗಿ ಮತ್ತು ಸ್ನೇಹಿತ ಜಯೇಶ್ ಯಾವಾಗಲೂ ಲಿಫ್ಟ್‌ನಲ್ಲಿ ಅಥವಾ ಕಚೇರಿಯ ಇತರ ಸ್ಥಳಗಳಲ್ಲಿ ಅವಳನ್ನು ನೋಡಿದಾಗ ಅವಳನ್ನು ಸೂಚ್ಯವಾಗಿ ನೋಡುತ್ತಾನೆ.",
            question: "Can this be considered as sexual harassment?",
            question_kan: "ಇದನ್ನು ಲೈಂಗಿಕ ಕಿರುಕುಳ ಎಂದು ಪರಿಗಣಿಸಬಹುದೇ?",
            options: [
                {
                    text: "No, it is okay to do that since they are friends.",
                    text_kan: "ಇಲ್ಲ, ಅವರು ಸ್ನೇಹಿತರಾಗಿರುವುದರಿಂದ ಹಾಗೆ ಮಾಡುವುದು ಸರಿ.",
                    feedback: "Incorrect. It is not okay to look at others suggestively, even if they are your friend.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇತರರು ನಿಮ್ಮ ಸ್ನೇಹಿತರಾಗಿದ್ದರೂ ಸಹ ಸೂಚ್ಯವಾಗಿ ನೋಡುವುದು ಸರಿಯಲ್ಲ.",
                    poshPoints: -1
                },
                {
                    text: "Yes, it is sexual harassment and she should report it.",
                    text_kan: "ಹೌದು, ಇದು ಲೈಂಗಿಕ ಕಿರುಕುಳ ಮತ್ತು ಅವಳು ಅದನ್ನು ವರದಿ ಮಾಡಬೇಕು.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1
                },
                {
                    text: "No, it is not sexual harassment because he is not actually touching her.",
                    text_kan: "ಇಲ್ಲ, ಅದು ಲೈಂಗಿಕ ಕಿರುಕುಳವಲ್ಲ ಏಕೆಂದರೆ ಅವನು ನಿಜವಾಗಿಯೂ ಅವಳನ್ನು ಮುಟ್ಟುತ್ತಿಲ್ಲ.",
                    feedback: "Incorrect. Sexual harassment does not necessarily have to be physical; any suggestive, sexually guided acts that make the other person uncomfortable can be considered sexual assault.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಲೈಂಗಿಕ ಕಿರುಕುಳವು ದೈಹಿಕವಾಗಿರಬೇಕಾಗಿಲ್ಲ; ಇತರ ವ್ಯಕ್ತಿಯನ್ನು ಅನಾನುಕೂಲಗೊಳಿಸುವ ಯಾವುದೇ ಸೂಚ್ಯ, ಲೈಂಗಿಕವಾಗಿ ಮಾರ್ಗದರ್ಶಿತ ಕೃತ್ಯಗಳನ್ನು ಲೈಂಗಿಕ ದೌರ್ಜನ್ಯವೆಂದು ಪರಿಗಣಿಸಬಹುದು.",
                    poshPoints: -1
                },
                {
                    text: "Yes it is sexual harassment but she shouldn’t report it because there is no evidence.",
                    text_kan: "ಹೌದು ಇದು ಲೈಂಗಿಕ ಕಿರುಕುಳ ಆದರೆ ಯಾವುದೇ ಪುರಾವೆಗಳಿಲ್ಲದ ಕಾರಣ ಅವಳು ಅದನ್ನು ವರದಿ ಮಾಡಬಾರದು.",
                    feedback: "Incorrect. Neha should still report the incident, since POSH looks into all complaints, regardless of whether evidence is there or not.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ನೇಹಾ ಇನ್ನೂ ಘಟನೆಯನ್ನು ವರದಿ ಮಾಡಬೇಕು, ಏಕೆಂದರೆ POSH ಎಲ್ಲಾ ದೂರುಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ, ಪುರಾವೆಗಳಿವೆಯೋ ಇಲ್ಲವೋ ಎಂಬುದನ್ನು ಲೆಕ್ಕಿಸದೆ.",
                    poshPoints: -1
                },
            ]
        },
        {
            id: 4,
            title: "Secret Photography and Group Chat Sharing",
            title_kan: "ರಹಸ್ಯ ಫೋಟೋಗ್ರಫಿ ಮತ್ತು ಗುಂಪು ಚಾಟ್ ಹಂಚಿಕೆ",
            description: "You discover that a colleague has been secretly taking photos of people in the office break room and sharing them in a private group chat without their knowledge or consent. When confronted, they claim it’s all in good fun and not a big deal.",
            description_kan: "ಸಹೋದ್ಯೋಗಿಯೊಬ್ಬರು ಕಚೇರಿಯ ವಿರಾಮ ಕೊಠಡಿಯಲ್ಲಿರುವ ಜನರ ಫೋಟೋಗಳನ್ನು ರಹಸ್ಯವಾಗಿ ತೆಗೆದು ಅವರ ಅರಿವಿಲ್ಲದೆ ಅಥವಾ ಒಪ್ಪಿಗೆಯಿಲ್ಲದೆ ಖಾಸಗಿ ಗುಂಪು ಚಾಟ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ ಎಂದು ನೀವು ಕಂಡುಕೊಂಡಿದ್ದೀರಿ. ಎದುರಾದಾಗ, ಇದೆಲ್ಲವೂ ಒಳ್ಳೆಯ ಮೋಜಿನಿಂದ ಕೂಡಿದೆ ಮತ್ತು ದೊಡ್ಡ ವಿಷಯವಲ್ಲ ಎಂದು ಅವರು ಹೇಳಿಕೊಳ್ಳುತ್ತಾರೆ.",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "Do nothing since no one appears to be physically harmed.",
                    text_kan: "ಯಾರಿಗೂ ದೈಹಿಕವಾಗಿ ಹಾನಿಯಾಗಿಲ್ಲದ ಕಾರಣ ಏನನ್ನೂ ಮಾಡಬೇಡಿ.",
                    feedback: "Incorrect. Physical harm is not the only concern—emotional distress, violation of privacy, and the creation of a hostile work environment are all serious issues.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ದೈಹಿಕ ಹಾನಿ ಮಾತ್ರ ಕಾಳಜಿಯಲ್ಲ - ಭಾವನಾತ್ಮಕ ಯಾತನೆ, ಗೌಪ್ಯತೆಯ ಉಲ್ಲಂಘನೆ ಮತ್ತು ಪ್ರತಿಕೂಲ ಕೆಲಸದ ವಾತಾವರಣದ ಸೃಷ್ಟಿ ಎಲ್ಲವೂ ಗಂಭೀರ ಸಮಸ್ಯೆಗಳು.",
                    poshPoints: -1,
                },
                {
                    text: "Report the behavior to the Internal Committee or HR for investigation.",
                    text_kan: "ತನಿಖೆಗಾಗಿ ಆಂತರಿಕ ಸಮಿತಿ ಅಥವಾ HR ಗೆ ನಡವಳಿಕೆಯನ್ನು ವರದಿ ಮಾಡಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1
                },
                {
                    text: "Join the group chat to see what’s being shared.",
                    text_kan: "ಏನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ ಎಂಬುದನ್ನು ನೋಡಲು ಗುಂಪು ಚಾಟ್‌ಗೆ ಸೇರಿ.",
                    feedback: "Incorrect. This makes you complicit in the inappropriate behavior and does not address the problem.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ನಿಮ್ಮನ್ನು ಅನುಚಿತ ವರ್ತನೆಯಲ್ಲಿ ಭಾಗಿಯಾಗುವಂತೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸುವುದಿಲ್ಲ.",
                    poshPoints: -1,
                },
                {
                    text: "Publicly confront the colleague and demand they stop immediately.",
                    text_kan: "ಸಹೋದ್ಯೋಗಿಯನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ಎದುರಿಸಿ ಮತ್ತು ಅವರು ತಕ್ಷಣ ನಿಲ್ಲಿಸಬೇಕೆಂದು ಒತ್ತಾಯಿಸಿ.",
                    feedback: "Incorrect. While it’s important to address the behavior, public confrontation can escalate the situation, breach confidentiality, and may not resolve the issue effectively. The proper channel for reporting is the Internal Committee or HR.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ನಡವಳಿಕೆಯನ್ನು ಪರಿಹರಿಸುವುದು ಮುಖ್ಯವಾದರೂ, ಸಾರ್ವಜನಿಕ ಘರ್ಷಣೆಯು ಪರಿಸ್ಥಿತಿಯನ್ನು ಉಲ್ಬಣಗೊಳಿಸಬಹುದು, ಗೌಪ್ಯತೆಯನ್ನು ಉಲ್ಲಂಘಿಸಬಹುದು ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಪರಿಹರಿಸದಿರಬಹುದು. ವರದಿ ಮಾಡಲು ಸರಿಯಾದ ಮಾರ್ಗವೆಂದರೆ ಆಂತರಿಕ ಸಮಿತಿ ಅಥವಾ HR.",
                    poshPoints: -1,
                }
            ]
        },
        {
            id: 5,
            title: "Provocative Calls from External Parties",
            title_kan: "ಗ್ರಾಹಕರಿಂದ ಅನುಚಿತ ವರ್ತನೆಯನ್ನು ನಿರ್ವಹಿಸುವುದು",
            description: "A customer service representative frequently gets calls from a number where a person provocatively speaks to them.",
            description_kan: "ಒಬ್ಬ ಗ್ರಾಹಕ ಸೇವಾ ಪ್ರತಿನಿಧಿಗೆ ಆಗಾಗ್ಗೆ ವ್ಯಕ್ತಿಯೊಬ್ಬರು ಪ್ರಚೋದನಕಾರಿಯಾಗಿ ಮಾತನಾಡುವ ಸಂಖ್ಯೆಯಿಂದ ಕರೆಗಳು ಬರುತ್ತವೆ.",
            question: "What should they NOT do in this situation?",
            question_kan: "ಈ ಸಂದರ್ಭದಲ್ಲಿ ಅವರು ಏನು ಮಾಡಬಾರದು?",
            options: [
                {
                    text: "Share details of the calls and the caller with colleagues for discussion.",
                    text_kan: "ಕರೆಗಳ ವಿವರಗಳನ್ನು ಮತ್ತು ಕರೆ ಮಾಡಿದವರ ವಿವರಗಳನ್ನು ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ಚರ್ಚೆಗಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1,
                },
                {
                    text: "Document any kind of evidence.",
                    text_kan: "ಯಾವುದೇ ರೀತಿಯ ಪುರಾವೆಗಳನ್ನು ದಾಖಲಿಸಿ.",
                    feedback: "Incorrect. Documenting evidence makes the reporting and investigation process easier.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಪುರಾವೆಗಳನ್ನು ದಾಖಲಿಸುವುದು ವರದಿ ಮಾಡುವಿಕೆ ಮತ್ತು ತನಿಖಾ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸುಲಭಗೊಳಿಸುತ್ತದೆ.",
                    poshPoints: -1,
                },
                {
                    text: "Immediately block and report the number.",
                    text_kan: "ತಕ್ಷಣವೇ ಸಂಖ್ಯೆಯನ್ನು ನಿರ್ಬಂಧಿಸಿ ಮತ್ತು ವರದಿ ಮಾಡಿ.",
                    feedback: "Incorrect. To prevent such behaviour from taking place, it is good to block the number so that such calls are not entertained anymore.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಅಂತಹ ನಡವಳಿಕೆ ನಡೆಯದಂತೆ ತಡೆಯಲು, ಅಂತಹ ಕರೆಗಳು ಇನ್ನು ಮುಂದೆ ಮನರಂಜನೆ ಪಡೆಯದಂತೆ ಸಂಖ್ಯೆಯನ್ನು ನಿರ್ಬಂಧಿಸುವುದು ಒಳ್ಳೆಯದು.",
                    poshPoints: -1,
                },
                {
                    text: "Set your boundaries and communicate your discomfort with the caller.",
                    text_kan: "ನಿಮ್ಮ ಮಿತಿಗಳನ್ನು ಹೊಂದಿಸಿ ಮತ್ತು ಕರೆ ಮಾಡಿದವರೊಂದಿಗೆ ನಿಮ್ಮ ಅಸ್ವಸ್ಥತೆಯನ್ನು ತಿಳಿಸಿ.",
                    feedback: "Incorrect. Voicing out how you feel may not stop the behaviour, but it can certainly make it clear to the caller that you do not tolerate their behaviour.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ನಿಮಗೆ ಹೇಗೆ ಅನಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ವ್ಯಕ್ತಪಡಿಸುವುದರಿಂದ ನಡವಳಿಕೆಯನ್ನು ನಿಲ್ಲಿಸದಿರಬಹುದು, ಆದರೆ ನೀವು ಅವರ ನಡವಳಿಕೆಯನ್ನು ಸಹಿಸುವುದಿಲ್ಲ ಎಂದು ಕರೆ ಮಾಡಿದವರಿಗೆ ಖಂಡಿತವಾಗಿಯೂ ಸ್ಪಷ್ಟಪಡಿಸಬಹುದು.",
                    poshPoints: -1,
                }
            ]
        },
        {
            id: 6,
            title: "Being a Confidant - Supporting a Harassment Victim",
            title_kan: "ಸಹೋದ್ಯೋಗಿ ಲೈಂಗಿಕ ಆಕ್ರಮಣವನ್ನು ಬಹಿರಂಗಪಡಿಸಿದಾಗ ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸಬೇಕು",
            description: "Priya told Bhaskar about how she was sexually assaulted by a coworker.",
            description_kan: "ಸಹೋದ್ಯೋಗಿಯೊಬ್ಬರು ತನ್ನ ಮೇಲೆ ಲೈಂಗಿಕ ದೌರ್ಜನ್ಯ ಎಸಗಿದ್ದಾರೆಂದು ಪ್ರಿಯಾ ಭಾಸ್ಕರ್‌ಗೆ ತಿಳಿಸಿದ್ದಾಳೆ.",
            question: "What should Bhaskar do now?",
            question_kan: "ಭಾಸ್ಕರ್ ಈಗ ಏನು ಮಾಡಬೇಕು?",
            options: [
                {
                    text: "Immediately report the incident to HR without informing Priya.",
                    text_kan: "ಪ್ರಿಯಾಗೆ ತಿಳಿಸದೆ ಘಟನೆಯನ್ನು ತಕ್ಷಣ ಮಾನವ ಸಂಪನ್ಮೂಲಕ್ಕೆ ವರದಿ ಮಾಡಿ.",
                    feedback: "Incorrect. While reporting sexual harassment is important, doing so without Priya’s knowledge or consent can undermine her autonomy and sense of control over the situation.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಲೈಂಗಿಕ ಕಿರುಕುಳವನ್ನು ವರದಿ ಮಾಡುವುದು ಮುಖ್ಯವಾದರೂ, ಪ್ರಿಯಾಳ ಜ್ಞಾನ ಅಥವಾ ಒಪ್ಪಿಗೆಯಿಲ್ಲದೆ ಹಾಗೆ ಮಾಡುವುದು ಅವಳ ಸ್ವಾಯತ್ತತೆ ಮತ್ತು ಪರಿಸ್ಥಿತಿಯ ಮೇಲಿನ ನಿಯಂತ್ರಣದ ಪ್ರಜ್ಞೆಯನ್ನು ದುರ್ಬಲಗೊಳಿಸುತ್ತದೆ.",
                    poshPoints: -1,
                },
                {
                    text: "Share the details with other colleagues to gather more information.",
                    text_kan: "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲು ಇತರ ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
                    feedback: "Incorrect. Discussing Priya’s experience with other colleagues breaches confidentiality and can lead to gossip, further distress, or reputational harm for Priya and others involved.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಪ್ರಿಯಾಳ ಅನುಭವವನ್ನು ಇತರ ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ಚರ್ಚಿಸುವುದು ಗೌಪ್ಯತೆಯನ್ನು ಉಲ್ಲಂಘಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರಿಯಾ ಮತ್ತು ಭಾಗಿಯಾಗಿರುವ ಇತರರಿಗೆ ಗಾಸಿಪ್, ಮತ್ತಷ್ಟು ಯಾತನೆ ಅಥವಾ ಖ್ಯಾತಿಗೆ ಹಾನಿಯನ್ನುಂಟುಮಾಡಬಹುದು.",
                    poshPoints: -1,
                },
                {
                    text: "Respect Priya’s wishes and support her in deciding whether or not to report the incident.",
                    text_kan: "ಪ್ರಿಯಾಳ ಆಶಯಗಳನ್ನು ಗೌರವಿಸಿ ಮತ್ತು ಘಟನೆಯನ್ನು ವರದಿ ಮಾಡಬೇಕೆ ಅಥವಾ ಬೇಡವೇ ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸುವಲ್ಲಿ ಅವಳನ್ನು ಬೆಂಬಲಿಸಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1,
                },
                {
                    text: "Ignore the situation and ask Priya not to talk about it.",
                    text_kan: "ಪರಿಸ್ಥಿತಿಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಮತ್ತು ಪ್ರಿಯಾ ಅದರ ಬಗ್ಗೆ ಮಾತನಾಡದಂತೆ ಕೇಳಿ.",
                    feedback: "Incorrect. Ignoring a report of sexual harassment allows inappropriate and harmful behavior to continue unaddressed. It is not good practice to encourage victims to stay silent, and it is better to offer whatever support they require while respecting their boundaries.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಲೈಂಗಿಕ ಕಿರುಕುಳದ ವರದಿಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದರಿಂದ ಅನುಚಿತ ಮತ್ತು ಹಾನಿಕಾರಕ ನಡವಳಿಕೆಯು ಗಮನಕ್ಕೆ ಬಾರದೆ ಮುಂದುವರಿಯುತ್ತದೆ. ಬಲಿಪಶುಗಳು ಮೌನವಾಗಿರಲು ಪ್ರೋತ್ಸಾಹಿಸುವುದು ಒಳ್ಳೆಯ ಅಭ್ಯಾಸವಲ್ಲ, ಮತ್ತು ಅವರ ಮಿತಿಗಳನ್ನು ಗೌರವಿಸುತ್ತಾ ಅವರಿಗೆ ಅಗತ್ಯವಿರುವ ಯಾವುದೇ ಬೆಂಬಲವನ್ನು ನೀಡುವುದು ಉತ್ತಮ.",
                    poshPoints: -1,
                }
            ]
        },
        {
            id: 7,
            title: "Consent for Physical Contact in Workplace Celebrations",
            title_kan: "ಕೆಲಸದ ಸ್ಥಳದ ಆಚರಣೆಗಳಲ್ಲಿ ದೈಹಿಕ ಸಂಪರ್ಕಕ್ಕೆ ಸಮ್ಮತಿ",
            description: "Ananya just got promoted, and Rohan asks if he can hug Ananya after hearing the good news. Ananya is hesitant and just laughs nervously, and Rohan hugs her.",
            description_kan: "ಅನನ್ಯಾಗೆ ಈಗಷ್ಟೇ ಬಡ್ತಿ ಸಿಕ್ಕಿದೆ, ಮತ್ತು ರೋಹನ್ ಅನನ್ಯಾಳನ್ನು ಆಲಂಗಿಸಬಹುದೇ ಎಂದು ಕೇಳುತ್ತಾನೆ. ಅನನ್ಯ ಹಿಂಜರಿಯುತ್ತಾಳೆ ಮತ್ತು ಆತಂಕದಿಂದ ನಗುತ್ತಾಳೆ, ಮತ್ತು ರೋಹನ್ ಅವಳನ್ನು ಆಲಂಗಿಸುತ್ತಾನೆ.",
            question: "Does this mean Ananya consented to the hug?",
            question_kan: "ಇದರರ್ಥ ಅನನ್ಯಾ ಅಪ್ಪುಗೆಗೆ ಒಪ್ಪಿಕೊಂಡಿದ್ದಾಳೆಯೇ?",
            options: [
                {
                    text: "Yes, because she didn't say no.",
                    text_kan: "ಹೌದು, ಏಕೆಂದರೆ ಅವಳು ಇಲ್ಲ ಎಂದು ಹೇಳಲಿಲ್ಲ.",
                    feedback: "Incorrect. Not saying yes or no, does not automatically mean consent is given.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಹೌದು ಅಥವಾ ಇಲ್ಲ ಎಂದು ಹೇಳದಿರುವುದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಒಪ್ಪಿಗೆ ನೀಡಲಾಗಿದೆ ಎಂದರ್ಥವಲ್ಲ.",
                    poshPoints: -1,
                },
                {
                    text: "No, because she didn’t say yes.",
                    text_kan: "ಇಲ್ಲ, ಏಕೆಂದರೆ ಅವಳು ಹೌದು ಎಂದು ಹೇಳಲಿಲ್ಲ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1
                },
                {
                    text: "Maybe, it's unclear so it's okay for him to hug her.",
                    text_kan: "ಬಹುಶಃ, ಅದು ಅಸ್ಪಷ್ಟವಾಗಿರಬಹುದು ಆದ್ದರಿಂದ ಅವನು ಅವಳನ್ನು ಆಲಂಗಿಸಿಕೊಳ್ಳುವುದು ಸರಿ.",
                    feedback: "Incorrect.  If it is unclear, consent is not given since she did not say yes.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಅದು ಅಸ್ಪಷ್ಟವಾಗಿದ್ದರೆ, ಅವಳು ಹೌದು ಎಂದು ಹೇಳದ ಕಾರಣ ಒಪ್ಪಿಗೆ ನೀಡಲಾಗುವುದಿಲ್ಲ.",
                    poshPoints: -1
                },
                {
                    text: "Yes, because silence also means yes.",
                    text_kan: "ಹೌದು, ಏಕೆಂದರೆ ಮೌನ ಎಂದರೆ ಹೌದು ಎಂದರ್ಥ.",
                    feedback: "Incorrect. Silence does not mean consent is given, anything but a yes is not consent.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಮೌನ ಎಂದರೆ ಒಪ್ಪಿಗೆ ನೀಡಲಾಗಿದೆ ಎಂದಲ್ಲ, ಹೌದು ಹೊರತುಪಡಿಸಿ ಬೇರೆ ಯಾವುದೂ ಒಪ್ಪಿಗೆ ನೀಡುವುದಿಲ್ಲ.",
                    poshPoints: -1
                }
            ]
        },
        {
            id: 8,
            title: "Escalating an Unresolved Grievance",
            title_kan: "ಆರಂಭಿಕ ದೂರುಗಳನ್ನು ಪರಿಹರಿಸದಿದ್ದರೆ ಏನು ಮಾಡಬೇಕು",
            description: "Rajiv is dissatisfied with the response he received from his supervisor regarding his grievance about inappropriate behavior.",
            description_kan: "ಅನುಚಿತ ವರ್ತನೆಯ ಬಗ್ಗೆ ತನ್ನ ಮೇಲ್ವಿಚಾರಕರಿಂದ ಬಂದ ದೂರಿನ ಬಗ್ಗೆ ರಾಜೀವ್ ಅತೃಪ್ತರಾಗಿದ್ದಾರೆ.",
            question: "What is his next step as per the formal grievance process?",
            question_kan: "ಔಪಚಾರಿಕ ದೂರು ಪ್ರಕ್ರಿಯೆಯ ಪ್ರಕಾರ ಅವರ ಮುಂದಿನ ಹೆಜ್ಜೆ ಏನು?",
            options: [
                {
                    text: "Accept the supervisor’s response and drop the issue.",
                    text_kan: "ಮೇಲ್ವಿಚಾರಕರ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸ್ವೀಕರಿಸಿ ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ಕೈಬಿಡಿ.",
                    feedback: "Incorrect. If Rajiv feels his grievance was not addressed appropriately, simply accepting the supervisor’s response and dropping the issue means his concerns remain unresolved. This does not utilize the formal escalation mechanisms available and may allow inappropriate behavior to continue unaddressed.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ರಾಜೀವ್ ತಮ್ಮ ದೂರುಗಳನ್ನು ಸೂಕ್ತವಾಗಿ ಪರಿಹರಿಸಲಾಗಿಲ್ಲ ಎಂದು ಭಾವಿಸಿದರೆ, ಮೇಲ್ವಿಚಾರಕರ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸ್ವೀಕರಿಸಿ ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ಕೈಬಿಟ್ಟರೆ ಅವರ ಕಳವಳಗಳು ಬಗೆಹರಿಯದೆ ಉಳಿದಿವೆ ಎಂದರ್ಥ. ಇದು ಲಭ್ಯವಿರುವ ಔಪಚಾರಿಕ ಉಲ್ಬಣ ಕಾರ್ಯವಿಧಾನಗಳನ್ನು ಬಳಸುವುದಿಲ್ಲ ಮತ್ತು ಅನುಚಿತ ನಡವಳಿಕೆಯನ್ನು ಪರಿಹರಿಸದೆ ಮುಂದುವರಿಯಲು ಅವಕಾಶ ನೀಡಬಹುದು.",
                    poshPoints: -1
                },
                {
                    text: "Submit a written appeal to HR within the stipulated time frame for further investigation.",
                    text_kan: "ಹೆಚ್ಚಿನ ತನಿಖೆಗಾಗಿ ನಿಗದಿತ ಸಮಯದೊಳಗೆ HR ಗೆ ಲಿಖಿತ ಮನವಿಯನ್ನು ಸಲ್ಲಿಸಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1
                },
                {
                    text: "Discuss the grievance openly with other colleagues.",
                    text_kan: "ಇತರ ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ದೂರನ್ನು ಮುಕ್ತವಾಗಿ ಚರ್ಚಿಸಿ.",
                    feedback: "Incorrect. Talking about the grievance with colleagues can breach confidentiality, create a hostile work environment, and potentially lead to gossip or retaliation. It does not contribute to a formal resolution and may complicate the investigation process.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ಕುಂದುಕೊರತೆಯ ಬಗ್ಗೆ ಮಾತನಾಡುವುದು ಗೌಪ್ಯತೆಯನ್ನು ಉಲ್ಲಂಘಿಸಬಹುದು, ಪ್ರತಿಕೂಲ ಕೆಲಸದ ವಾತಾವರಣವನ್ನು ಸೃಷ್ಟಿಸಬಹುದು ಮತ್ತು ಸಂಭಾವ್ಯವಾಗಿ ಗಾಸಿಪ್ ಅಥವಾ ಪ್ರತೀಕಾರಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು. ಇದು ಔಪಚಾರಿಕ ಪರಿಹಾರಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುವುದಿಲ್ಲ ಮತ್ತು ತನಿಖಾ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸಂಕೀರ್ಣಗೊಳಿಸಬಹುದು.",
                    poshPoints: -1
                },
                {
                    text: "Post about the incident on social media to seek support.",
                    text_kan: "ಬೆಂಬಲವನ್ನು ಪಡೆಯಲು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮದಲ್ಲಿ ಘಟನೆಯ ಬಗ್ಗೆ ಪೋಸ್ಟ್ ಮಾಡಿ.",
                    feedback: "Incorrect. Sharing workplace grievances on social media is inappropriate and can violate company policies on confidentiality. It may also expose Rajiv and the organization to reputational harm and legal consequences, and it does not address the issue through proper internal channels.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಕೆಲಸದ ಸ್ಥಳದ ಕುಂದುಕೊರತೆಗಳನ್ನು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳುವುದು ಸೂಕ್ತವಲ್ಲ ಮತ್ತು ಕಂಪನಿಯ ಗೌಪ್ಯತೆಯ ನೀತಿಗಳನ್ನು ಉಲ್ಲಂಘಿಸಬಹುದು. ಇದು ರಾಜೀವ್ ಮತ್ತು ಸಂಸ್ಥೆಯ ಖ್ಯಾತಿಗೆ ಹಾನಿ ಮತ್ತು ಕಾನೂನು ಪರಿಣಾಮಗಳಿಗೆ ಕಾರಣವಾಗಬಹುದು ಮತ್ತು ಇದು ಸರಿಯಾದ ಆಂತರಿಕ ಮಾರ್ಗಗಳ ಮೂಲಕ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸುವುದಿಲ್ಲ.",
                    poshPoints: -1
                }
            ]
        },
        {
            id: 9,
            title: "Handling Proven False Complaints",
            title_kan: "ಗೊತ್ತಿದ್ದೂ ಸುಳ್ಳು ಕಿರುಕುಳ ಆರೋಪಗಳನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುವುದು",
            description: "After an inquiry, the company finds that a sexual harassment complaint was filed by an employee with the intent to harm a colleague’s reputation, and the allegations were proven to be knowingly false.",
            description_kan: "ವಿಚಾರಣೆಯ ನಂತರ, ಸಹೋದ್ಯೋಗಿಯ ಖ್ಯಾತಿಗೆ ಹಾನಿ ಮಾಡುವ ಉದ್ದೇಶದಿಂದ ಉದ್ಯೋಗಿಯೊಬ್ಬರು ಲೈಂಗಿಕ ಕಿರುಕುಳ ದೂರು ದಾಖಲಿಸಿದ್ದಾರೆ ಎಂದು ಕಂಪನಿಯು ಕಂಡುಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು ಆರೋಪಗಳು ತಿಳಿದೇ ಸುಳ್ಳು ಎಂದು ಸಾಬೀತಾಗಿದೆ.",
            question: "What should they do next?",
            question_kan: "ಅವರು ಮುಂದೆ ಏನು ಮಾಡಬೇಕು?",
            options: [
                {
                    text: "Immediately punish the complainant without conducting a thorough inquiry.",
                    text_kan: "ಸಂಪೂರ್ಣ ವಿಚಾರಣೆ ನಡೆಸದೆ ದೂರುದಾರರನ್ನು ತಕ್ಷಣ ಶಿಕ್ಷಿಸಬೇಕು.",
                    feedback: "Incorrect. Immediate punishment without inquiry violates due process and the complainant’s rights. The company must hear both sides and look for appropriate evidence.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ವಿಚಾರಣೆಯಿಲ್ಲದೆ ತಕ್ಷಣದ ಶಿಕ್ಷೆಯು ಸೂಕ್ತ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ದೂರುದಾರರ ಹಕ್ಕುಗಳನ್ನು ಉಲ್ಲಂಘಿಸುತ್ತದೆ. ಕಂಪನಿಯು ಎರಡೂ ಕಡೆಯವರನ್ನು ಕೇಳಬೇಕು ಮತ್ತು ಸೂಕ್ತ ಪುರಾವೆಗಳನ್ನು ಹುಡುಕಬೇಕು.",
                    poshPoints: -1
                },
                {
                    text: "Recommend disciplinary action against the complainant only after establishing malicious intent through a fair and impartial inquiry.",
                    text_kan: "ನ್ಯಾಯಯುತ ಮತ್ತು ನಿಷ್ಪಕ್ಷಪಾತ ತನಿಖೆಯ ಮೂಲಕ ದುರುದ್ದೇಶಪೂರಿತ ಉದ್ದೇಶವನ್ನು ಸ್ಥಾಪಿಸಿದ ನಂತರವೇ ದೂರುದಾರರ ವಿರುದ್ಧ ಶಿಸ್ತು ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ಶಿಫಾರಸು ಮಾಡಿ",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1
                },
                {
                    text: "Take action against the complainant just because the complaint could not be substantiated.",
                    text_kan: "ದೂರನ್ನು ದೃಢೀಕರಿಸಲು ಸಾಧ್ಯವಾಗದ ಕಾರಣ ದೂರುದಾರರ ವಿರುದ್ಧ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ.",
                    feedback: "Incorrect. Action against the complainant can only be taken if it is proven, after inquiry, that the complaint was knowingly false or malicious.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ವಿಚಾರಣೆಯ ನಂತರ ದೂರು ತಿಳಿದೂ ಸುಳ್ಳು ಅಥವಾ ದುರುದ್ದೇಶಪೂರಿತ ಎಂದು ಸಾಬೀತಾದರೆ ಮಾತ್ರ ದೂರುದಾರರ ವಿರುದ್ಧ ಕ್ರಮ ಕೈಗೊಳ್ಳಬಹುದು.",
                    poshPoints: -1
                },
                {
                    text: "Ignore the situation since false complaints are very rare.",
                    text_kan: "ಸುಳ್ಳು ದೂರುಗಳು ಬಹಳ ವಿರಳವಾಗಿರುವುದರಿಂದ ಪರಿಸ್ಥಿತಿಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ.",
                    feedback: "Incorrect. Ignoring a proven false or malicious complaint undermines the integrity of the POSH process and can cause harm to the falsely accused person.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸಾಬೀತಾಗಿರುವ ಸುಳ್ಳು ಅಥವಾ ದುರುದ್ದೇಶಪೂರಿತ ದೂರನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದರಿಂದ POSH ಪ್ರಕ್ರಿಯೆಯ ಸಮಗ್ರತೆಯನ್ನು ಹಾಳುಮಾಡುತ್ತದೆ ಮತ್ತು ಸುಳ್ಳು ಆರೋಪ ಹೊರಿಸಲಾದ ವ್ಯಕ್ತಿಗೆ ಹಾನಿ ಉಂಟುಮಾಡಬಹುದು.",
                    poshPoints: -1
                }
            ]
        },
        {
            id: 10,
            title: "Group Photo Consent and Physical Boundaries",
            title_kan: "ತಂಡದ ಕೂಟಗಳಲ್ಲಿ ವೈಯಕ್ತಿಕ ಗಡಿಗಳನ್ನು ಗೌರವಿಸುವುದು",
            description: "During a team celebration at the office, a colleague puts his arm around another employee for a group photo. The employee looks visibly uncomfortable and later tells the colleague she did not want to be touched.",
            description_kan: "ಕಚೇರಿಯಲ್ಲಿ ತಂಡದ ಸಂಭ್ರಮಾಚರಣೆಯ ಸಮಯದಲ್ಲಿ, ಸಹೋದ್ಯೋಗಿಯೊಬ್ಬರು ಗುಂಪು ಫೋಟೋಕ್ಕಾಗಿ ಇನ್ನೊಬ್ಬ ಉದ್ಯೋಗಿಯ ಸುತ್ತಲೂ ತನ್ನ ತೋಳನ್ನು ಹಾಕುತ್ತಾರೆ. ಉದ್ಯೋಗಿಯು ಗೋಚರವಾಗಿ ಅನಾನುಕೂಲವಾಗಿ ಕಾಣುತ್ತಾಳೆ ಮತ್ತು ನಂತರ ಸಹೋದ್ಯೋಗಿಗೆ ತಾನು ಸ್ಪರ್ಶಿಸಲು ಬಯಸುವುದಿಲ್ಲ ಎಂದು ಹೇಳುತ್ತಾಳೆ.",
            question: "What should the colleague have done?",
            question_kan: "ಸಹೋದ್ಯೋಗಿ ಏನು ಮಾಡಬೇಕಿತ್ತು?",
            options: [
                {
                    text: "Assumed it was acceptable since it was a group photo.",
                    text_kan: "ಅದು ಗುಂಪು ಫೋಟೋ ಆಗಿರುವುದರಿಂದ ಅದು ಸ್ವೀಕಾರಾರ್ಹವೆಂದು ಭಾವಿಸಲಾಗಿದೆ",
                    feedback: "Incorrect. Assuming consent just because others are present or because it’s a group activity ignores the individual’s right to personal boundaries.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇತರರು ಇದ್ದಾರೆ ಅಥವಾ ಅದು ಗುಂಪು ಚಟುವಟಿಕೆಯಾಗಿದೆ ಎಂಬ ಕಾರಣಕ್ಕಾಗಿ ಒಪ್ಪಿಗೆಯನ್ನು ಊಹಿಸುವುದು ವ್ಯಕ್ತಿಯ ವೈಯಕ್ತಿಕ ಗಡಿಗಳಿಗೆ ಹಕ್ಕನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ.",
                    poshPoints: -1
                },
                {
                    text: "Asked for her consent before making any physical contact.",
                    text_kan: "ಯಾವುದೇ ದೈಹಿಕ ಸಂಪರ್ಕವನ್ನು ಮಾಡುವ ಮೊದಲು ಅವಳ ಒಪ್ಪಿಗೆಯನ್ನು ಕೇಳಲಾಗಿದೆ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    poshPoints: 1
                },
                {
                    text: "Ignored her discomfort because everyone else seemed fine.",
                    text_kan: "ಉಳಿದವರೆಲ್ಲರೂ ಚೆನ್ನಾಗಿರುವಂತೆ ಕಾಣುತ್ತಿರುವುದರಿಂದ ಅವಳ ಅಸ್ವಸ್ಥತೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಲಾಗಿದೆ.",
                    feedback: " Incorrect. Consent is individual and subjective—it cannot be overridden by group dynamics or peer behavior. Ignoring someone’s discomfort because others are not objecting disregards their autonomy and can perpetuate a hostile work environment.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಒಪ್ಪಿಗೆಯು ವೈಯಕ್ತಿಕ ಮತ್ತು ವ್ಯಕ್ತಿನಿಷ್ಠವಾಗಿದೆ - ಗುಂಪು ಡೈನಾಮಿಕ್ಸ್ ಅಥವಾ ಗೆಳೆಯರ ನಡವಳಿಕೆಯಿಂದ ಅದನ್ನು ಅತಿಕ್ರಮಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಇತರರು ಆಕ್ಷೇಪಿಸದ ಕಾರಣ ಯಾರೊಬ್ಬರ ಅಸ್ವಸ್ಥತೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದು ಅವರ ಸ್ವಾಯತ್ತತೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರತಿಕೂಲ ಕೆಲಸದ ವಾತಾವರಣವನ್ನು ಶಾಶ್ವತಗೊಳಿಸುತ್ತದೆ.",
                    poshPoints: -1
                },
                {
                    text: "Told her she was overreacting and should not make a fuss.",
                    text_kan: "ಅವಳು ಅತಿಯಾಗಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಿದ್ದಾಳೆ ಮತ್ತು ಗಲಾಟೆ ಮಾಡಬಾರದು ಎಂದು ಅವಳಿಗೆ ಹೇಳಿದೆ.",
                    feedback: " Incorrect. Dismissing or belittling someone’s discomfort is a form of victim-blaming and can discourage people from reporting genuine grievances.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಯಾರೊಬ್ಬರ ಅಸ್ವಸ್ಥತೆಯನ್ನು ತಳ್ಳಿಹಾಕುವುದು ಅಥವಾ ಕಡಿಮೆ ಮಾಡುವುದು ಒಂದು ರೀತಿಯ ಬಲಿಪಶುವನ್ನು ದೂಷಿಸುವ ಮತ್ತು ಜನರು ನಿಜವಾದ ಕುಂದುಕೊರತೆಗಳನ್ನು ವರದಿ ಮಾಡುವುದನ್ನು ನಿರುತ್ಸಾಹಗೊಳಿಸಬಹುದು.",
                    poshPoints: -1
                }
            ]
        }
    ];

    const handleOptionSelect = (optionIndex) => {
        setSelectedAnswer(optionIndex);
    };

    // FIXED FUNCTION to properly handle scenario progression and score calculation
    const handleNextScenario = () => {
        // If an answer hasn't been submitted yet and an option is selected
        if (!answerSubmitted && selectedAnswer !== null) {
            // Get the selected option for the current scenario
            const option = scenarios[ currentScenario ].options[ selectedAnswer ];

            // Calculate new points
            const newposhPoints = poshPoints + option.poshPoints;

            // Update points based on the selected option
            setPoshPoints(newposhPoints);

            // Store the response for review later
            setScenarioResponses(prev => [ ...prev, {
                scenarioId: scenarios[ currentScenario ].id,
                title: scenarios[ currentScenario ].title,
                title_kan: scenarios[ currentScenario ].title_kan,
                selectedOption: scenarios[ currentScenario ].options[ selectedAnswer ].text,
                selectedOption_kan: scenarios[ currentScenario ].options[ selectedAnswer ].text_kan,
                feedback: scenarios[ currentScenario ].options[ selectedAnswer ].feedback,
                feedback_kan: scenarios[ currentScenario ].options[ selectedAnswer ].feedback_kan,
                poshDelta: option.poshPoints
            } ]);

            // Mark that an answer has been submitted for this scenario
            setAnswerSubmitted(true);
        }
        // If an answer has already been submitted, move to next scenario or results
        else if (answerSubmitted) {
            // Check if there are more scenarios to show
            if (currentScenario < scenarios.length - 1) {
                // Move to the next scenario
                setCurrentScenario(prevScenario => prevScenario + 1);
                setSelectedAnswer(null);
                setAnswerSubmitted(false);
            } else {
                // We're at the last scenario, calculate equity points and show results

                // Use the refs to ensure we have the latest values
                const currentposh = poshPointsRef.current;

                // Log the final calculations for debugging
                console.log("Final calculation:");
                console.log(`Total: ${currentposh}`);

                setGameState('results');
            }
        }
    };

    // FIXED getResult function with clearer condition checks
    const getResult = () => {
        // Calculate the total points
        const total = poshPoints;

        // Log for debugging
        console.log(`getResult calculating total: ${total}`);

        // Check against thresholds in descending order
        if (total > 19) {
            // got highest score of 20
            return {
                level: "PoSH Awareness Champion",
                level_kan: "ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಚಾಂಪಿಯನ್",
                message: "Congratulations! You have a deep understanding of PoSH policies.",
                message_kan: "ಅಭಿನಂದನೆಗಳು! ನಿಮಗೆ PoSH ನೀತಿಗಳ ಬಗ್ಗೆ ಆಳವಾದ ತಿಳುವಳಿಕೆ ಇದೆ."
            };
        }
        else if (total >= 10) {
            // got score between 10 and 19
            return {
                level: "PoSH Awareness Leader",
                level_kan: "ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ನಾಯಕ",
                message: "You're doing well! Keep learning to become a PoSH Awareness Champion.",
                message_kan: "ನೀವು ಚೆನ್ನಾಗಿದ್ದೀರಿ! PoSH ಜಾಗೃತಿ ಚಾಂಪಿಯನ್ ಆಗಲು ಕಲಿಯುತ್ತಿರಿ."
            };
        }
        else if (total > 0) {
            // got score between 1 and 9
            return {
                level: "Posh Etiquette Learner",
                level_kan: "ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಕಲಿಕಾರ",
                message: "You have a good start but need to polish your PoSH policies. Keep learning and growing.",
                message_kan: "ನೀವು ಉತ್ತಮ ಆರಂಭವನ್ನು ಹೊಂದಿದ್ದೀರಿ ಆದರೆ ನಿಮ್ಮ PoSH ನೀತಿಗಳನ್ನು ಮೆರುಗುಗೊಳಿಸಬೇಕಾಗಿದೆ. ಕಲಿಯುತ್ತಿರಲಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರಲಿ."
            };
        }
        else {
            return {
                level: "Posh Etiquette Beginner",
                level_kan: "ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಪ್ರಾರಂಭಿಕ",
                message: "It's time to play again and learn more about PoSH policies.",
                message_kan: "ಮತ್ತೊಮ್ಮೆ ಆಡಲು ಮತ್ತು PoSH ನೀತಿಗಳ ಕುರಿತು ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಇದು ಸಮಯ."
            };
        }
    };

    const resetGame = () => {
        setGameState('intro');
        setCurrentScenario(0);
        setPoshPoints(10);
        setSelectedAnswer(null);
        setAnswerSubmitted(false);
        setScenarioResponses([]);
    };

    const startGame = () => {
        setGameState('playing');
    };

    // Calculate progress percentage
    const progressPercentage = ((currentScenario + 1) / scenarios.length) * 100;

    // Introduction Screen
    if (gameState === 'intro') {
        return (
            <div className="game-container red">
                <div className="game-card">
                    <div className="card-header red">
                        <h1>PoSH Awareness Quiz</h1>
                        <h1>ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ನೀತಿಯ ಜಾಗೃತಿಗಾಗಿ ರಸಪ್ರಶ್ನೆ</h1>
                    </div>

                    <div className="card-body">
                        <img
                            src="/posh.jpg"
                            alt="PoSH Quiz Introduction"
                            style={{ width: "100%", display: "block", marginBottom: "1.5rem", borderRadius: "8px" }}
                        />
                        <h2>Welcome! ಸ್ವಾಗತ!</h2>
                        <p>Creating a safe and respectful workplace is everyone&apos;s responsibility. This quiz is designed to test your understanding of key concepts, policies, and procedures related to preventing sexual harassment in the workplace.</p>
                        <p>
                            ಸುರಕ್ಷಿತ ಮತ್ತು ಗೌರವಾನ್ವಿತ ಕೆಲಸದ ಸ್ಥಳವನ್ನು ರಚಿಸುವುದು ಪ್ರತಿಯೊಬ್ಬರ ಜವಾಬ್ದಾರಿಯಾಗಿದೆ. ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳವನ್ನು ತಡೆಗಟ್ಟಲು ಸಂಬಂಧಿಸಿದ ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಗಳು, ನೀತಿಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಲು ಈ ರಸಪ್ರಶ್ನೆಯನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.
                        </p>
                        <p>
                            Understanding these principles helps protect not only yourself but also your colleagues, and contributes to building a workplace where everyone can feel safe, respected, and valued.
                            <br />
                            Take your time, think through each scenario, and remember that in real situations, when in doubt, always err on the side of safety and follow proper reporting procedures.
                        </p>
                        <p>
                            ಈ ತತ್ವಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ನಿಮ್ಮನ್ನು ಮಾತ್ರವಲ್ಲದೆ ನಿಮ್ಮ ಸಹೋದ್ಯೋಗಿಗಳನ್ನು ಸಹ ರಕ್ಷಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ಪ್ರತಿಯೊಬ್ಬರೂ ಸುರಕ್ಷಿತ, ಗೌರವಾನ್ವಿತ ಮತ್ತು ಮೌಲ್ಯಯುತವೆಂದು ಭಾವಿಸುವ ಕೆಲಸದ ಸ್ಥಳವನ್ನು ನಿರ್ಮಿಸಲು ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.
                            <br />
                            ನಿಮ್ಮ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ, ಪ್ರತಿಯೊಂದು ಸನ್ನಿವೇಶದ ಮೂಲಕ ಯೋಚಿಸಿ, ಮತ್ತು ನೈಜ ಸಂದರ್ಭಗಳಲ್ಲಿ, ಸಂದೇಹವಿದ್ದಾಗ, ಯಾವಾಗಲೂ ಸುರಕ್ಷತೆಯ ಬದಿಯಲ್ಲಿ ತಪ್ಪು ಮಾಡಿ ಮತ್ತು ಸರಿಯಾದ ವರದಿ ಮಾಡುವ ವಿಧಾನಗಳನ್ನು ಅನುಸರಿಸಿ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ.
                        </p>

                        <div className="info-box">
                            <ul>
                                <li>You start with 10 points | ನೀವು 10 ಅಂಕಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ</li>
                                <li>Correct answer | ಸರಿಯಾದ ಉತ್ತರ : +1 point</li>
                                <li>Wrong answer | ತಪ್ಪು ಉತ್ತರ : -1 point</li>
                            </ul>
                        </div>

                        <button onClick={startGame} className="primary-button red">
                            Start Game| ಪ್ರಾರಂಭಿಸಿ<ArrowRight className="icon" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (gameState === 'results') {
        const result = getResult();
        const totalPoints = poshPoints;

        return (
            <div className="game-container red">
                <div className="game-card results-card">
                    <div className="card-header red">
                        <h1>Quiz Results</h1>
                    </div>

                    <div className="card-body">
                        <div className="results-summary">
                            <Award className="award-icon" size={64} />
                            <h2>{result.level}</h2>
                            <h2>{result.level_kan}</h2>
                            <p>{result.message}</p>
                            <p>{result.message_kan}</p>
                            <div className="score-container">
                                <div className="score-item">
                                    <div className="score-value">{totalPoints.toFixed(1)}</div>
                                    <div className="score-label">Score</div>
                                </div>
                            </div>
                        </div>

                        <h3>Review Your Responses</h3>
                        <h3>ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ</h3>
                        <div className="responses-container">
                            {scenarioResponses.map((response, index) => (
                                <div key={index} className="response-item">
                                    <h4>{response.title}</h4>
                                    <h4>{response.title_kan}</h4>
                                    <p className="response-text">Your response: {response.selectedOption}</p>
                                    {response.selectedOption_kan && response.selectedOption_kan.trim() !== "" && (
                                        <p className="response-text">ನಿಮ್ಮ ಉತ್ತರ: {response.selectedOption_kan}</p>
                                    )}
                                    <p className="feedback-text">{response.feedback}</p>
                                    {response.feedback_kan && response.feedback_kan.trim() !== "" && (
                                        <p className="feedback-text">{response.feedback_kan}</p>
                                    )}
                                    <div className="points-container">
                                        <div className={response.poshDelta > 0 ? "positive-points" : response.poshDelta < 0 ? "negative-points" : ""}>
                                            Points: {response.poshDelta > 0 ? '+' : ''}{response.poshDelta}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={resetGame} className="primary-button red">
                            Play Again | ಮತ್ತೆ ಪ್ಲೇ ಮಾಡಿ <RefreshCcw className="icon" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Game Playing Screen
    return (
        <div className="game-container red">
            <div className="game-card">
                <div className="card-header red">
                    <h1>Q {currentScenario + 1}: {scenarios[ currentScenario ].title}</h1>
                    <h1>{scenarios[ currentScenario ].title_kan}</h1>
                    <div className="points-display">
                        <div className="point-badge primary-badge">
                            Current Score: {poshPoints}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progressPercentage}%` }}
                            aria-valuenow={progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            role="progressbar"
                            aria-label="Game progress"
                        ></div>
                    </div>

                    <p className="scenario-description">{scenarios[ currentScenario ].description}</p>
                    {scenarios[ currentScenario ].description_kan && scenarios[ currentScenario ].description_kan.trim() !== "" && (
                        <p className="scenario-description">{scenarios[ currentScenario ].description_kan}</p>
                    )}

                    {scenarios[ currentScenario ].explainer && (
                        <div className="explainer-box">
                            <h3>Finance Explainer</h3>
                            <p>{scenarios[ currentScenario ].explainer}</p>
                        </div>
                    )}

                    <h3 className="scenario-question">{scenarios[ currentScenario ].question}</h3>
                    {scenarios[ currentScenario ].question_kan && scenarios[ currentScenario ].question_kan.trim() !== "" && (
                        <h3 className="scenario-question">{scenarios[ currentScenario ].question_kan}</h3>
                    )}

                    <div className="options-container">
                        {scenarios[ currentScenario ].options.map((option, index) => (
                            <div
                                key={index}
                                className={`option-item red ${selectedAnswer === index ? 'selected-option' : ''
                                    } ${answerSubmitted && selectedAnswer === index ? 'submitted-option' : ''
                                    } ${answerSubmitted && selectedAnswer !== index ? 'faded-option' : ''
                                    }`}
                                onClick={() => !answerSubmitted && handleOptionSelect(index)}
                                tabIndex={!answerSubmitted ? 0 : -1}
                                role="button"
                                aria-pressed={selectedAnswer === index}
                            >
                                {option.text}
                                {option.text_kan && option.text_kan.trim() !== "" && (
                                    <>
                                        <br />
                                        {option.text_kan}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {answerSubmitted && selectedAnswer !== null && (
                        <div className={`feedback-box ${scenarios[ currentScenario ].options[ selectedAnswer ].poshPoints > 0
                            ? 'positive-feedback'
                            : 'negative-feedback'
                            }`}>
                            <p>{scenarios[ currentScenario ].options[ selectedAnswer ].feedback}</p>
                            {scenarios[ currentScenario ].options[ selectedAnswer ].feedback_kan &&
                                scenarios[ currentScenario ].options[ selectedAnswer ].feedback_kan.trim() !== "" && (
                                    <p>{scenarios[ currentScenario ].options[ selectedAnswer ].feedback_kan}</p>
                                )}
                            <div className="feedback-points">
                                <div className={
                                    scenarios[ currentScenario ].options[ selectedAnswer ].poshPoints > 0
                                        ? "positive-points"
                                        : scenarios[ currentScenario ].options[ selectedAnswer ].poshPoints < 0
                                            ? "negative-points"
                                            : ""
                                }>
                                    Points: {scenarios[ currentScenario ].options[ selectedAnswer ].poshPoints > 0 ? '+' : ''}
                                    {scenarios[ currentScenario ].options[ selectedAnswer ].poshPoints}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleNextScenario}
                        disabled={selectedAnswer === null}
                        className={`primary-button red ${selectedAnswer === null ? 'disabled-button' : ''}`}
                    >
                        {answerSubmitted
                            ? currentScenario < scenarios.length - 1
                                ? "Next Scenario | ಮುಂದಿನ ಪ್ರಶ್ನೆ"
                                : "See Results | ಪರಿಣಾಮಗಳನ್ನು ನೋಡಿ"
                            : "Submit Answer | ಉತ್ತರವನ್ನು ಸಲ್ಲಿಸಿ"}
                        <ArrowRight className="icon" size={18} />
                    </button>

                    <div className="scenario-counter">
                        Question {currentScenario + 1} of {scenarios.length} | ಪ್ರಶ್ನೆ {currentScenario + 1} / {scenarios.length} ರಲ್ಲಿ
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoshGame;