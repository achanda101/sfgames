import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, RefreshCcw } from 'lucide-react';
import './game.css';



const WorkplaceGame = () => {
    const [ gameState, setGameState ] = useState('intro');
    const [ currentScenario, setCurrentScenario ] = useState(0);
    const [ workplacePoints, setWorkplacePoints ] = useState(10);
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const [ answerSubmitted, setAnswerSubmitted ] = useState(false);
    const [ scenarioResponses, setScenarioResponses ] = useState([]);

    // Use refs to track the latest values for calculations
    const workplacePointsRef = useRef(workplacePoints);

    // Update refs when state changes
    useEffect(() => {
        workplacePointsRef.current = workplacePoints;
    }, [ workplacePoints ]);


    const scenarios = [
        {
            id: 1,
            title: "Multicultural Communication and Language Barriers",
            title_kan: "ಬಹುಸಂಸ್ಕೃತಿ ಸಂವಹನ ಮತ್ತು ಭಾಷಾ ಅಡೆತಡೆಗಳು",
            description: "Raj is in a multicultural team and uses certain local slang words in unofficial conversations that others don’t understand.",
            description_kan: "ರಾಜ್ ಬಹುಸಂಸ್ಕೃತಿ ತಂಡದಲ್ಲಿದ್ದಾರೆ ಮತ್ತು ಇತರರಿಗೆ ಅರ್ಥವಾಗದ ಅನಧಿಕೃತ ಸಂಭಾಷಣೆಗಳಲ್ಲಿ ಕೆಲವು ಸ್ಥಳೀಯ ಗ್ರಾಮ್ಯ ಪದಗಳನ್ನು ಬಳಸುತ್ತಾರೆ.ಇತರರು ಏನು ಮಾಡಬೇಕು?",
            question: "What should the others do?",
            question_kan: "ಇತರರು ಏನು ಮಾಡಬೇಕು?",
            options: [
                {
                    text: "Ask him about the slang and make it a learning opportunity",
                    text_kan: "ಆಡುಭಾಷೆಯ ಬಗ್ಗೆ ಅವರನ್ನು ಕೇಳಿ ಮತ್ತು ಅದನ್ನು ಕಲಿಕೆಯ ಅವಕಾಶವನ್ನಾಗಿ ಮಾಡಿ",
                    feedback: "Correct. Ask him about the slang and make it a learning opportunity.",
                    feedback_kan: "ಸರಿ. ಆಡುಭಾಷೆಯ ಬಗ್ಗೆ ಕೇಳಿ ಮತ್ತು ಅದನ್ನು ಕಲಿಕೆಯ ಅವಕಾಶವನ್ನಾಗಿ ಮಾಡಿ.",
                    workplacePoints: 1,
                },
                {
                    text: "Demand that he use clear, easier-to-understand language",
                    text_kan: "ಸ್ಪಷ್ಟವಾದ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸುಲಭವಾದ ಭಾಷೆಯನ್ನು ಬಳಸುವಂತೆ ಒತ್ತಾಯಿಸಿ",
                    feedback: "Incorrect. While it is important to use appropriate language, having diversity includes allowing cultural differences to exist and learning from them; hence, it is not appropriate to make a colleague feel indifferent because of how they speak.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸೂಕ್ತವಾದ ಭಾಷೆಯನ್ನು ಬಳಸುವುದು ಮುಖ್ಯವಾದರೂ, ವೈವಿಧ್ಯತೆಯನ್ನು ಹೊಂದಿರುವುದು ಸಾಂಸ್ಕೃತಿಕ ವ್ಯತ್ಯಾಸಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿರಲು ಅವಕಾಶ ನೀಡುವುದು ಮತ್ತು ಅವುಗಳಿಂದ ಕಲಿಯುವುದನ್ನು ಒಳಗೊಂಡಿದೆ; ಆದ್ದರಿಂದ, ಸಹೋದ್ಯೋಗಿ ಮಾತನಾಡುವ ವಿಧಾನದಿಂದಾಗಿ ಅಸಡ್ಡೆ ಭಾವನೆ ಮೂಡಿಸುವುದು ಸೂಕ್ತವಲ್ಲ.",
                    workplacePoints: -1,
                },
                {
                    text: "Avoid listening to him when he speaks",
                    text_kan: "ಅವರು ಮಾತನಾಡುವಾಗ ಅವರ ಮಾತನ್ನು ಕೇಳುವುದನ್ನು ತಪ್ಪಿಸಿ",
                    feedback: "Incorrect. Ignoring someone when they speak is disrespectful and unprofessional.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಯಾರನ್ನಾದರೂ ಅವರು ಮಾತನಾಡುವಾಗ ನಿರ್ಲಕ್ಷಿಸುವುದು ಅಗೌರವ ಮತ್ತು ವೃತ್ತಿಪರವಲ್ಲದ.",
                    workplacePoints: -1,
                },
                {
                    text: "Talk over him so that he doesn’t use the slang",
                    text_kan: "ಆಡುಭಾಷೆಯನ್ನು ಬಳಸದಂತೆ ಅವರ ಮೇಲೆ ಮಾತನಾಡಿ",
                    feedback: "Incorrect. Talking over someone is rude and disrupts effective communication. It can create a hostile environment and lead to communication gaps.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಯಾರನ್ನಾದರೂ ಕುರಿತು ಮಾತನಾಡುವುದು ಅಸಭ್ಯ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಸಂವಹನವನ್ನು ಅಡ್ಡಿಪಡಿಸುತ್ತದೆ. ಇದು ಪ್ರತಿಕೂಲ ವಾತಾವರಣವನ್ನು ಸೃಷ್ಟಿಸಬಹುದು ಮತ್ತು ಸಂವಹನ ಅಂತರಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು.",
                    workplacePoints: -1,
                }
            ]
        },
        {
            id: 2,
            title: "Reading Body Language Signals",
            title_kan: "ದೇಹ ಭಾಷಾ ಸಂಕೇತಗಳನ್ನು ಓದುವುದು",
            description: "During a conversation, someone keeps their arms folded and avoids eye contact.",
            description_kan: "ಸಂಭಾಷಣೆಯ ಸಮಯದಲ್ಲಿ, ಯಾರಾದರೂ ತಮ್ಮ ತೋಳುಗಳನ್ನು ಮಡಚಿ ಕಣ್ಣಿನ ಸಂಪರ್ಕವನ್ನು ತಪ್ಪಿಸುತ್ತಾರೆ.",
            question: "What does this body language suggest?",
            question_kan: "ಈ ದೇಹ ಭಾಷೆ ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?",
            options: [
                {
                    text: "Engagement and interest",
                    text_kan: "ನಿಶ್ಚಿತಾರ್ಥ ಮತ್ತು ಆಸಕ್ತಿ",
                    feedback: "Incorrect. Folded arms and avoiding eye contact are generally not signs of engagement or interest. Engaged and interested individuals typically display open body language, maintain eye contact, and orient themselves toward the speaker.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಮಡಚಿದ ತೋಳುಗಳು ಮತ್ತು ಕಣ್ಣಿನ ಸಂಪರ್ಕವನ್ನು ತಪ್ಪಿಸುವುದು ಸಾಮಾನ್ಯವಾಗಿ ನಿಶ್ಚಿತಾರ್ಥ ಅಥವಾ ಆಸಕ್ತಿಯ ಸಂಕೇತಗಳಲ್ಲ. ತೊಡಗಿಸಿಕೊಂಡ ಮತ್ತು ಆಸಕ್ತಿ ಹೊಂದಿರುವ ವ್ಯಕ್ತಿಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಮುಕ್ತ ದೇಹ ಭಾಷೆಯನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತಾರೆ, ಕಣ್ಣಿನ ಸಂಪರ್ಕವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುತ್ತಾರೆ ಮತ್ತು ಸ್ಪೀಕರ್ ಕಡೆಗೆ ತಮ್ಮನ್ನು ತಾವು ಓರಿಯಂಟ್ ಮಾಡಿಕೊಳ್ಳುತ್ತಾರೆ.",
                    workplacePoints: -1,
                },
                {
                    text: "Discomfort or lack of interest",
                    text_kan: "ಅಸ್ವಸ್ಥತೆ ಅಥವಾ ಆಸಕ್ತಿಯ ಕೊರತೆ",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1,
                },
                {
                    text: "Confidence",
                    text_kan: "ಆತ್ಮವಿಶ್ವಾಸ",
                    feedback: "Incorrect. While in rare cases crossed arms can be a power pose, when combined with avoiding eye contact, it does not signal confidence.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಅಪರೂಪದ ಸಂದರ್ಭಗಳಲ್ಲಿ ಅಡ್ಡ ತೋಳುಗಳು ಶಕ್ತಿಯ ಭಂಗಿಯಾಗಿರಬಹುದು, ಕಣ್ಣಿನ ಸಂಪರ್ಕವನ್ನು ತಪ್ಪಿಸುವುದರೊಂದಿಗೆ ಸಂಯೋಜಿಸಿದಾಗ, ಅದು ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ಸೂಚಿಸುವುದಿಲ್ಲ.",
                    workplacePoints: -1,
                },
                {
                    text: "Happiness",
                    text_kan: "ಸಂತೋಷ",
                    feedback: "Incorrect. Folded arms and lack of eye contact do not convey happiness; instead, they are more likely to signal discomfort, tension, or a desire to withdraw from the interaction. Happiness is generally shown through smiling and positive facial expressions.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಮಡಚಿದ ತೋಳುಗಳು ಮತ್ತು ಕಣ್ಣಿನ ಸಂಪರ್ಕದ ಕೊರತೆಯು ಸಂತೋಷವನ್ನು ತಿಳಿಸುವುದಿಲ್ಲ; ಬದಲಾಗಿ, ಅವು ಅಸ್ವಸ್ಥತೆ, ಉದ್ವೇಗ ಅಥವಾ ಸಂವಹನದಿಂದ ಹಿಂದೆ ಸರಿಯುವ ಬಯಕೆಯನ್ನು ಸೂಚಿಸುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ಸಂತೋಷವನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ನಗುತ್ತಿರುವ ಮತ್ತು ಸಕಾರಾತ್ಮಕ ಮುಖಭಾವಗಳ ಮೂಲಕ ತೋರಿಸಲಾಗುತ್ತದೆ.",
                    workplacePoints: -1,
                }
            ]
        },
        {
            id: 3,
            title: "Professional Greetings and Introductions",
            title_kan: "ವೃತ್ತಿಪರ ಶುಭಾಶಯಗಳು ಮತ್ತು ಪರಿಚಯಗಳು",
            description: "Meena always greets new colleagues with a handshake and stands up when introduced.",
            description_kan: "ಮೀನಾ ಯಾವಾಗಲೂ ಹೊಸ ಸಹೋದ್ಯೋಗಿಗಳನ್ನು ಹಸ್ತಲಾಘವದಿಂದ ಸ್ವಾಗತಿಸುತ್ತಾರೆ ಮತ್ತು ಪರಿಚಯಿಸಿದಾಗ ಎದ್ದು ನಿಲ್ಲುತ್ತಾರೆ.",
            question: "Why is this a good practice?",
            question_kan: "ಇದು ಏಕೆ ಒಳ್ಳೆಯ ಅಭ್ಯಾಸ?",
            options: [
                {
                    text: "It’s unnecessary in business.",
                    text_kan: "ವ್ಯವಹಾರದಲ್ಲಿ ಇದು ಅನಗತ್ಯ",
                    feedback: "Incorrect. Saying it’s unnecessary ignores the value of such etiquette in building rapport and trust. Greeting colleagues helps create a positive first impression.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಅನಗತ್ಯ ಎಂದು ಹೇಳುವುದು ಬಾಂಧವ್ಯ ಮತ್ತು ವಿಶ್ವಾಸವನ್ನು ಬೆಳೆಸುವಲ್ಲಿ ಅಂತಹ ಶಿಷ್ಟಾಚಾರದ ಮೌಲ್ಯವನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ. ಸಹೋದ್ಯೋಗಿಗಳನ್ನು ಸ್ವಾಗತಿಸುವುದು ಸಕಾರಾತ್ಮಕ ಮೊದಲ ಅನಿಸಿಕೆಯನ್ನು ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
                    workplacePoints: -1
                },
                {
                    text: "It wastes time.",
                    text_kan: "ಇದು ಸಮಯ ವ್ಯರ್ಥ ಮಾಡುತ್ತದೆ.",
                    feedback: "Incorrect. Taking a moment to greet someone properly does not waste time; instead, it helps establish a foundation for effective communication and teamwork. Good etiquette can save time in the long run by facilitating smoother interactions and reducing misunderstandings.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಯಾರನ್ನಾದರೂ ಸರಿಯಾಗಿ ಸ್ವಾಗತಿಸಲು ಒಂದು ಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳುವುದು ಸಮಯ ವ್ಯರ್ಥ ಮಾಡುವುದಿಲ್ಲ; ಬದಲಾಗಿ, ಇದು ಪರಿಣಾಮಕಾರಿ ಸಂವಹನ ಮತ್ತು ತಂಡದ ಕೆಲಸಕ್ಕೆ ಅಡಿಪಾಯವನ್ನು ಸ್ಥಾಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಉತ್ತಮ ಶಿಷ್ಟಾಚಾರವು ಸುಗಮ ಸಂವಹನಗಳನ್ನು ಸುಗಮಗೊಳಿಸುವ ಮೂಲಕ ಮತ್ತು ತಪ್ಪುಗ್ರಹಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುವ ಮೂಲಕ ದೀರ್ಘಾವಧಿಯಲ್ಲಿ ಸಮಯವನ್ನು ಉಳಿಸಬಹುದು.",
                    workplacePoints: -1
                },
                {
                    text: "It demonstrates respect and confidence.",
                    text_kan: "ಇದು ಗೌರವ ಮತ್ತು ವಿಶ್ವಾಸವನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1
                },
                {
                    text: "It’s only needed for senior staff.",
                    text_kan: "ಇದು ಹಿರಿಯ ಸಿಬ್ಬಂದಿಗೆ ಮಾತ್ರ ಅಗತ್ಯವಿದೆ.",
                    feedback: "Incorrect. Professional courtesy should be extended to everyone, regardless of their position",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಅವರ ಸ್ಥಾನ ಏನೇ ಇರಲಿ, ಎಲ್ಲರಿಗೂ ವೃತ್ತಿಪರ ಸೌಜನ್ಯವನ್ನು ವಿಸ್ತರಿಸಬೇಕು.",
                    workplacePoints: -1
                },
            ]
        },
        {
            id: 4,
            title: "Taking Accountability for Mistakes",
            title_kan: "ತಪ್ಪುಗಳಿಗೆ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ತೆಗೆದುಕೊಳ್ಳುವುದು",
            description: "Celia falsely accused one of her subordinates of miscommunicating with clients, she later realised that she was initially at fault for the miscommunication and passed the wrong information to her subordinate.",
            description_kan: "ಸೆಲಿಯಾ ತನ್ನ ಅಧೀನ ಅಧಿಕಾರಿಯೊಬ್ಬರು ಕಕ್ಷಿದಾರರೊಂದಿಗೆ ತಪ್ಪು ಸಂವಹನ ನಡೆಸಿದ್ದಾರೆ ಎಂದು ಸುಳ್ಳು ಆರೋಪ ಮಾಡಿದಳು, ನಂತರ ಅವಳು ಆರಂಭದಲ್ಲಿ ತಪ್ಪು ಸಂವಹನಕ್ಕೆ ತಾನು ತಪ್ಪಿತಸ್ಥನೆಂದು ಅರಿತುಕೊಂಡಳು ಮತ್ತು ತನ್ನ ಅಧೀನ ಅಧಿಕಾರಿಗೆ ತಪ್ಪು ಮಾಹಿತಿಯನ್ನು ರವಾನಿಸಿದಳು.",
            question: "What is the best way for her to handle the situation? ",
            question_kan: "ಪರಿಸ್ಥಿತಿಯನ್ನು ನಿಭಾಯಿಸಲು ಉತ್ತಮ ಮಾರ್ಗ ಯಾವುದು?",
            options: [
                {
                    text: "Ignore her mistake and do not say anything since she is the superior and does not need to apologize to anyone.",
                    text_kan: "ತನ್ನ ತಪ್ಪನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಮತ್ತು ಏನನ್ನೂ ಹೇಳಬೇಡಿ ಏಕೆಂದರೆ ಅವಳು ಮೇಲಧಿಕಾರಿಯಾಗಿದ್ದಾಳೆ ಮತ್ತು ಯಾರೊಂದಿಗೂ ಕ್ಷಮೆಯಾಚಿಸುವ ಅಗತ್ಯವಿಲ್ಲ.",
                    feedback: "Incorrect. Not addressing the error can damage her credibility and the working relationship with her subordinate.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ದೋಷವನ್ನು ಪರಿಹರಿಸದಿರುವುದು ಅವಳ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಅವಳ ಅಧೀನ ಅಧಿಕಾರಿಯೊಂದಿಗಿನ ಕೆಲಸದ ಸಂಬಂಧವನ್ನು ಹಾನಿಗೊಳಿಸುತ್ತದೆ.",
                    workplacePoints: -1,
                },
                {
                    text: "Tell the subordinate that they should have known better and to handle the situation better next time.",
                    text_kan: "ಮುಂದಿನ ಬಾರಿ ಪರಿಸ್ಥಿತಿಯನ್ನು ಚೆನ್ನಾಗಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕಿತ್ತು ಮತ್ತು ಉತ್ತಮವಾಗಿ ನಿಭಾಯಿಸಬೇಕೆಂದು ಅಧೀನ ಅಧಿಕಾರಿಗಳಿಗೆ ಹೇಳಿ.",
                    feedback: "Incorrect. It is dishonest and can demotivate the subordinate, leading to resentment and a toxic work environment. This option unfairly shifts blame onto the subordinate, despite Celia knowing she was at fault.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಅಪ್ರಾಮಾಣಿಕವಾಗಿದೆ ಮತ್ತು ಅಧೀನ ಅಧಿಕಾರಿಯನ್ನು ಕೆಳಮಟ್ಟಕ್ಕೆ ತಳ್ಳಬಹುದು, ಇದು ಅಸಮಾಧಾನ ಮತ್ತು ವಿಷಕಾರಿ ಕೆಲಸದ ವಾತಾವರಣಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು. ಸೆಲಿಯಾಗೆ ತಾನು ತಪ್ಪು ಎಂದು ತಿಳಿದಿದ್ದರೂ ಸಹ, ಈ ಆಯ್ಕೆಯು ಅನ್ಯಾಯವಾಗಿ ಅಧೀನ ಅಧಿಕಾರಿಯ ಮೇಲೆ ಹೊಣೆಯನ್ನು ವರ್ಗಾಯಿಸುತ್ತದೆ.",
                    workplacePoints: -1,
                },
                {
                    text: "Apologize to the client but not to her subordinate.",
                    text_kan: "ಕ್ಲೈಂಟ್‌ಗೆ ಕ್ಷಮೆಯಾಚಿಸಿ ಆದರೆ ಅವಳ ಅಧೀನ ಅಧಿಕಾರಿಗೆ ಅಲ್ಲ.",
                    feedback: "Incorrect. While apologizing to the client is necessary, failing to apologize to the subordinate ignores the harm done to the team member. It shows a lack of respect and accountability toward the subordinate, which can erode trust and morale.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಕ್ಲೈಂಟ್‌ಗೆ ಕ್ಷಮೆಯಾಚಿಸುವುದು ಅಗತ್ಯವಾಗಿದ್ದರೂ, ಅಧೀನ ಅಧಿಕಾರಿಗೆ ಕ್ಷಮೆಯಾಚಿಸಲು ವಿಫಲವಾದರೆ ತಂಡದ ಸದಸ್ಯರಿಗೆ ಆಗಿರುವ ಹಾನಿಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ. ಇದು ಅಧೀನ ಅಧಿಕಾರಿಯ ಬಗ್ಗೆ ಗೌರವ ಮತ್ತು ಹೊಣೆಗಾರಿಕೆಯ ಕೊರತೆಯನ್ನು ತೋರಿಸುತ್ತದೆ, ಇದು ನಂಬಿಕೆ ಮತ್ತು ನೈತಿಕತೆಯನ್ನು ಕುಗ್ಗಿಸಬಹುದು.",
                    workplacePoints: -1,
                },
                {
                    text: "Take accountability for her mistake and apologize to her subordinate and client, ensuring it will never happen again.",
                    text_kan: "ಅವಳ ತಪ್ಪಿಗೆ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ತೆಗೆದುಕೊಂಡು ಅವಳ ಅಧೀನ ಅಧಿಕಾರಿ ಮತ್ತು ಕಕ್ಷಿದಾರರಿಗೆ ಕ್ಷಮೆಯಾಚಿಸಿ, ಅದು ಮತ್ತೆ ಎಂದಿಗೂ ಸಂಭವಿಸುವುದಿಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1
                }
            ]
        },
        {
            id: 5,
            title: "Meeting Interruption Etiquette",
            title_kan: "ಸಭೆಯಲ್ಲಿ ಅಡ್ಡಿಪಡಿಸಲು ಸರಿಯಾದ ವಿಧಾನ",
            description: "You are in a meeting and want to add a point while someone else is speaking.",
            description_kan: "ನೀವು ಸಭೆಯಲ್ಲಿದ್ದರೆ ಮತ್ತು ಬೇರೆಯವರು ಮಾತನಾಡುತ್ತಿರುವಾಗ ಒಂದು ಅಂಶವನ್ನು ಸೇರಿಸಲು ಬಯಸುತ್ತೀರಿ.",
            question: "What’s the best approach?",
            question_kan: "ಉತ್ತಮ ವಿಧಾನ ಯಾವುದು?",
            options: [
                {
                    text: "Interrupt loudly.",
                    text_kan: "ಜೋರಾಗಿ ಅಡ್ಡಿಪಡಿಸಿ.",
                    feedback: "Incorrect. Interrupting loudly is disrespectful and disrupts the flow of the meeting.It can make the current speaker feel undervalued and can create a negative or hostile atmosphere.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಜೋರಾಗಿ ಅಡ್ಡಿಪಡಿಸುವುದು ಅಗೌರವ ಮತ್ತು ಸಭೆಯ ಹರಿವಿಗೆ ಅಡ್ಡಿಪಡಿಸುತ್ತದೆ. ಇದು ಪ್ರಸ್ತುತ ಮಾತನಾಡುವವರನ್ನು ಕಡಿಮೆ ಮೌಲ್ಯಯುತವೆಂದು ಭಾವಿಸುವಂತೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ನಕಾರಾತ್ಮಕ ಅಥವಾ ಪ್ರತಿಕೂಲ ವಾತಾವರಣವನ್ನು ಸೃಷ್ಟಿಸಬಹುದು.",
                    workplacePoints: -1,
                },
                {
                    text: "Use a polite phrase like 'May I add something here?'",
                    text_kan: "'ನಾನು ಇಲ್ಲಿ ಏನನ್ನಾದರೂ ಸೇರಿಸಬಹುದೇ?' ನಂತಹ ಸಭ್ಯ ನುಡಿಗಟ್ಟು ಬಳಸಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1,
                },
                {
                    text: "Talk over them.",
                    text_kan: "ಅವುಗಳ ಬಗ್ಗೆ ಮಾತನಾಡಿ.",
                    feedback: "Incorrect. Talking over someone is rude and prevents effective communication. It can lead to confusion, missed information, and resentment among team members.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಯಾರನ್ನಾದರೂ ಕುರಿತು ಮಾತನಾಡುವುದು ಅಸಭ್ಯ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಸಂವಹನವನ್ನು ತಡೆಯುತ್ತದೆ. ಇದು ತಂಡದ ಸದಸ್ಯರಲ್ಲಿ ಗೊಂದಲ, ತಪ್ಪಿದ ಮಾಹಿತಿ ಮತ್ತು ಅಸಮಾಧಾನಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು.",
                    workplacePoints: -1,
                },
                {
                    text: "Wait until the meeting ends.",
                    text_kan: "ಸಭೆ ಮುಗಿಯುವವರೆಗೆ ಕಾಯಿರಿ.",
                    feedback: "Incorrect. Waiting until the meeting ends may cause your point to become irrelevant or forgotten by the time you get to speak. It can result in missed opportunities to contribute to the discussion promptly.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸಭೆ ಮುಗಿಯುವವರೆಗೆ ಕಾಯುವುದು ನೀವು ಮಾತನಾಡುವ ಹೊತ್ತಿಗೆ ನಿಮ್ಮ ಅಂಶವು ಅಪ್ರಸ್ತುತವಾಗಬಹುದು ಅಥವಾ ಮರೆತುಹೋಗಬಹುದು. ಇದು ಚರ್ಚೆಗೆ ತ್ವರಿತವಾಗಿ ಕೊಡುಗೆ ನೀಡುವ ಅವಕಾಶಗಳನ್ನು ಕಳೆದುಕೊಳ್ಳಲು ಕಾರಣವಾಗಬಹುದು.",
                    workplacePoints: -1,
                }
            ]
        },
        {
            id: 6,
            title: "Handling Missed Deadlines",
            title_kan: "ತಪ್ಪಿದ ಗಡುವನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುವುದು",
            description: "Rajesh missed his deadline for a very important project.",
            description_kan: "ರಾಜೇಶ್ ಬಹಳ ಮುಖ್ಯವಾದ ಯೋಜನೆಗೆ ಗಡುವು ತಪ್ಪಿಸಿಕೊಂಡರು",
            question: "What is the best way for him to deal with this situation?",
            question_kan: "ನಿಭಾಯಿಸಲು ಅವನಿಗೆ ಉತ್ತಮ ಮಾರ್ಗ ಯಾವುದು?",
            options: [
                {
                    text: "Take responsibility, inform his supervisor, explain the reason for the delay, and propose a plan to complete the project as soon as possible.",
                    text_kan: "ಜವಾಬ್ದಾರಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ, ತನ್ನ ಮೇಲ್ವಿಚಾರಕರಿಗೆ ತಿಳಿಸಿ, ವಿಳಂಬಕ್ಕೆ ಕಾರಣವನ್ನು ವಿವರಿಸಿ ಮತ್ತು ಯೋಜನೆಯನ್ನು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ ಪೂರ್ಣಗೊಳಿಸಲು ಯೋಜನೆಯನ್ನು ಪ್ರಸ್ತಾಪಿಸಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1,
                },
                {
                    text: "Blame his teammates for the delay.",
                    text_kan: "ವಿಳಂಬಕ್ಕೆ ತನ್ನ ತಂಡದ ಸದಸ್ಯರನ್ನು ದೂಷಿಸಿ.",
                    feedback: "Incorrect. The missed deadline will likely be noticed, which can damage Rajesh’s credibility and trust with his team and supervisor.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ತಪ್ಪಿದ ಗಡುವು ಗಮನಕ್ಕೆ ಬರುವ ಸಾಧ್ಯತೆಯಿದೆ, ಇದು ರಾಜೇಶ್ ಅವರ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಅವರ ತಂಡ ಮತ್ತು ಮೇಲ್ವಿಚಾರಕರ ಮೇಲಿನ ನಂಬಿಕೆಯನ್ನು ಹಾನಿಗೊಳಿಸುತ್ತದೆ.",
                    workplacePoints: -1,
                },
                {
                    text: "Ignore the missed deadline and hope no one notices.",
                    text_kan: "ತಪ್ಪಿದ ಗಡುವನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಮತ್ತು ಯಾರೂ ಗಮನಿಸುವುದಿಲ್ಲ ಎಂದು ಭಾವಿಸಿ.",
                    feedback: "Incorrect. Shifting blame to others is unfair and erodes trust within the team. It leads to conflict and toxicity in the work environment.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇತರರ ಮೇಲೆ ದೂಷಣೆ ಮಾಡುವುದು ಅನ್ಯಾಯ ಮತ್ತು ತಂಡದೊಳಗಿನ ನಂಬಿಕೆಯನ್ನು ಹಾಳು ಮಾಡುತ್ತದೆ. ಇದು ಕೆಲಸದ ವಾತಾವರಣದಲ್ಲಿ ಸಂಘರ್ಷ ಮತ್ತು ವಿಷತ್ವಕ್ಕೆ ಕಾರಣವಾಗುತ್ತದೆ.",
                    workplacePoints: -1,
                },
                {
                    text: "Submit the incomplete work without mentioning the delay.",
                    text_kan: "ವಿಳಂಬವನ್ನು ಉಲ್ಲೇಖಿಸದೆ ಅಪೂರ್ಣ ಕೆಲಸವನ್ನು ಸಲ್ಲಿಸಿ.",
                    feedback: "Incorrect. Submitting incomplete work without explanation is dishonest and may cause further issues for the project and the team. It shows a lack of accountability and respect for the standards expected in the workplace.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ವಿವರಣೆಯಿಲ್ಲದೆ ಅಪೂರ್ಣ ಕೆಲಸವನ್ನು ಸಲ್ಲಿಸುವುದು ಅಪ್ರಾಮಾಣಿಕವಾಗಿದೆ ಮತ್ತು ಯೋಜನೆ ಮತ್ತು ತಂಡಕ್ಕೆ ಮತ್ತಷ್ಟು ಸಮಸ್ಯೆಗಳನ್ನು ಉಂಟುಮಾಡಬಹುದು. ಇದು ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ನಿರೀಕ್ಷಿತ ಮಾನದಂಡಗಳಿಗೆ ಹೊಣೆಗಾರಿಕೆ ಮತ್ತು ಗೌರವದ ಕೊರತೆಯನ್ನು ತೋರಿಸುತ್ತದೆ.",
                    workplacePoints: -1,
                }
            ]
        },
        {
            id: 7,
            title: "Inappropriate Meeting Behavior",
            title_kan: "ಅನುಚಿತ ಸಭೆಯ ನಡವಳಿಕೆ",
            description: "During a team meeting, Anil falls asleep, and another is on their phone.",
            description_kan: "ತಂಡದ ಸಭೆಯ ಸಮಯದಲ್ಲಿ, ಅನಿಲ್ ನಿದ್ರಿಸುತ್ತಾನೆ, ಮತ್ತು ಇನ್ನೊಬ್ಬರು ಅವರ ಫೋನ್‌ನಲ್ಲಿದ್ದಾರೆ.",
            question: "What does this behavior indicate?",
            question_kan: "ಈ ನಡವಳಿಕೆ ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?",
            options: [
                {
                    text: "High engagement.",
                    text_kan: "ಹೆಚ್ಚಿನ ನಿಶ್ಚಿತಾರ್ಥ.",
                    feedback: "Incorrect. Falling asleep and using a phone during a meeting are clear signs of disengagement, not engagement. If they were engaged, they would participate actively.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸಭೆಯ ಸಮಯದಲ್ಲಿ ನಿದ್ರಿಸುವುದು ಮತ್ತು ಫೋನ್ ಬಳಸುವುದು ನಿಶ್ಚಿತಾರ್ಥದ ಸ್ಪಷ್ಟ ಚಿಹ್ನೆಗಳು, ನಿಶ್ಚಿತಾರ್ಥವಲ್ಲ. ಅವರು ನಿಶ್ಚಿತಾರ್ಥದಲ್ಲಿದ್ದರೆ, ಅವರು ಸಕ್ರಿಯವಾಗಿ ಭಾಗವಹಿಸುತ್ತಾರೆ.",
                    workplacePoints: -1,
                },
                {
                    text: "Unacceptable meeting etiquette.",
                    text_kan: "ಸ್ವೀಕಾರಾರ್ಹವಲ್ಲದ ಸಭೆಯ ಶಿಷ್ಟಾಚಾರ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1
                },
                {
                    text: "Effective participation.",
                    text_kan: "ಪರಿಣಾಮಕಾರಿ ಭಾಗವಹಿಸುವಿಕೆ.",
                    feedback: "Incorrect. Effective participation involves actively listening, contributing to the conversation, and being present, which is not shown by Anil’s behaviour.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಪರಿಣಾಮಕಾರಿ ಭಾಗವಹಿಸುವಿಕೆಯು ಸಕ್ರಿಯವಾಗಿ ಆಲಿಸುವುದು, ಸಂಭಾಷಣೆಗೆ ಕೊಡುಗೆ ನೀಡುವುದು ಮತ್ತು ಹಾಜರಿರುವುದನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ, ಇದು ಅನಿಲ್ ಅವರ ನಡವಳಿಕೆಯಿಂದ ತೋರಿಸಲ್ಪಡುವುದಿಲ್ಲ.",
                    workplacePoints: -1
                },
                {
                    text: "Respect for the speaker.",
                    text_kan: "ಭಾಷಣಕಾರರಿಗೆ ಗೌರವ.",
                    feedback: "Incorrect. Sleeping or being on a phone is disrespectful and signals that the speaker’s message is not valued.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಮಲಗುವುದು ಅಥವಾ ಫೋನ್‌ನಲ್ಲಿರುವುದು ಅಗೌರವ ಮತ್ತು ಭಾಷಣಕಾರರ ಸಂದೇಶಕ್ಕೆ ಬೆಲೆ ಇಲ್ಲ ಎಂದು ಸೂಚಿಸುತ್ತದೆ.",
                    workplacePoints: -1
                }
            ]
        },
        {
            id: 8,
            title: "Addressing Workplace Harassment",
            title_kan: "ಕಾರ್ಯಸ್ಥಳದ ಕಿರುಕುಳವನ್ನು ತಿಳಿಸುವುದು",
            description: "Priya experiences a coworker yelling at her during meetings.",
            description_kan: "ಸಭೆಗಳ ಸಮಯದಲ್ಲಿ ಪ್ರಿಯಾ ತನ್ನ ಸಹೋದ್ಯೋಗಿಯ ಮೇಲೆ ರೇಗುತ್ತಿರುವುದನ್ನು ಅನುಭವಿಸುತ್ತಾಳೆ.",
            question: "What is an appropriate way to address this?",
            question_kan: "ಇಇದನ್ನು ಪರಿಹರಿಸಲು ಸೂಕ್ತವಾದ ಮಾರ್ಗವೇನು?",
            options: [
                {
                    text: "Ignore it because it’s normal.",
                    text_kan: "ಇದು ಸಾಮಾನ್ಯವಾದ ಕಾರಣ ಅದನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ.",
                    feedback: "Incorrect. Ignoring inappropriate behavior allows it to continue and signals that such conduct is acceptable.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಅನುಚಿತ ನಡವಳಿಕೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದರಿಂದ ಅದು ಮುಂದುವರಿಯಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ ಮತ್ತು ಅಂತಹ ನಡವಳಿಕೆ ಸ್ವೀಕಾರಾರ್ಹ ಎಂದು ಸೂಚಿಸುತ್ತದೆ.",
                    workplacePoints: -1
                },
                {
                    text: "Recognize it as unacceptable and seek support or report it.",
                    text_kan: "ಅದನ್ನು ಸ್ವೀಕಾರಾರ್ಹವಲ್ಲವೆಂದು ಗುರುತಿಸಿ ಮತ್ತು ಬೆಂಬಲವನ್ನು ಪಡೆಯಿರಿ ಅಥವಾ ವರದಿ ಮಾಡಿ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1
                },
                {
                    text: "Yell back.",
                    text_kan: "ಮತ್ತೆ ಕೂಗಿ.",
                    feedback: "Incorrect. Two wrongs do not make a right; it’s better to address the situation calmly and constructively.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಎರಡು ತಪ್ಪುಗಳು ಸರಿ ಮಾಡುವುದಿಲ್ಲ; ಪರಿಸ್ಥಿತಿಯನ್ನು ಶಾಂತವಾಗಿ ಮತ್ತು ರಚನಾತ್ಮಕವಾಗಿ ಪರಿಹರಿಸುವುದು ಉತ್ತಮ.",
                    workplacePoints: -1
                },
                {
                    text: "Leave the meeting without saying anything.",
                    text_kan: "ಏನನ್ನೂ ಹೇಳದೆ ಸಭೆಯನ್ನು ಬಿಟ್ಟುಬಿಡಿ.",
                    feedback: "Incorrect. It can make Priya appear disengaged or unprofessional, and the inappropriate behavior may persist.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಪ್ರಿಯಾಳನ್ನು ನಿಷ್ಪಕ್ಷಪಾತ ಅಥವಾ ವೃತ್ತಿಪರರಲ್ಲದವರನ್ನಾಗಿ ಮಾಡಬಹುದು ಮತ್ತು ಅನುಚಿತ ನಡವಳಿಕೆ ಮುಂದುವರಿಯಬಹುದು.",
                    workplacePoints: -1
                }
            ]
        },
        {
            id: 9,
            title: "Meeting Leadership and Structure",
            title_kan: "ಸಭೆಯನ್ನು ಮುನ್ನಡೆಸಲು ಸರಿಯಾದ ವಿಧಾನ",
            description: "During a business meeting, the chairperson starts late and skips the agenda.",
            description_kan: "ವ್ಯವಹಾರ ಸಭೆಯ ಸಮಯದಲ್ಲಿ, ಅಧ್ಯಕ್ಷರು ತಡವಾಗಿ ಪ್ರಾರಂಭಿಸುತ್ತಾರೆ ಮತ್ತು ಕಾರ್ಯಸೂಚಿಯನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತಾರೆ.",
            question: "What is the likely result?",
            question_kan: "ಸಂಭವನೀಯ ಫಲಿತಾಂಶ ಏನು?",
            options: [
                {
                    text: "Efficient meeting.",
                    text_kan: "ಪರಿಣಾಮಕಾರಿ ಸಭೆ.",
                    feedback: "Incorrect. Delays disrupt workflow, waste participants’ time, and often lead to meetings running over, which further reduces efficiency for everyone involved.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ವಿಳಂಬಗಳು ಕೆಲಸದ ಹರಿವನ್ನು ಅಡ್ಡಿಪಡಿಸುತ್ತವೆ, ಭಾಗವಹಿಸುವವರ ಸಮಯವನ್ನು ವ್ಯರ್ಥ ಮಾಡುತ್ತವೆ ಮತ್ತು ಆಗಾಗ್ಗೆ ಸಭೆಗಳು ವಿಳಂಬವಾಗಲು ಕಾರಣವಾಗುತ್ತವೆ, ಇದು ಒಳಗೊಂಡಿರುವ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ದಕ್ಷತೆಯನ್ನು ಮತ್ತಷ್ಟು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
                    workplacePoints: -1
                },
                {
                    text: "Better Outcomes.",
                    text_kan: "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳು.",
                    feedback: "Incorrect. Without structure and punctuality, meetings are less likely to achieve their objectives or generate positive results.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ರಚನೆ ಮತ್ತು ಸಮಯಪ್ರಜ್ಞೆ ಇಲ್ಲದೆ, ಸಭೆಗಳು ತಮ್ಮ ಉದ್ದೇಶಗಳನ್ನು ಸಾಧಿಸುವ ಅಥವಾ ಸಕಾರಾತ್ಮಕ ಫಲಿತಾಂಶಗಳನ್ನು ಉತ್ಪಾದಿಸುವ ಸಾಧ್ಯತೆ ಕಡಿಮೆ.",
                    workplacePoints: -1
                },
                {
                    text: "Improved participation.",
                    text_kan: "ಸುಧಾರಿತ ಭಾಗವಹಿಸುವಿಕೆ.",
                    feedback: "Incorrect. Starting late and lacking an agenda can frustrate participants, cause loss of focus, and decrease engagement.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ತಡವಾಗಿ ಪ್ರಾರಂಭಿಸುವುದು ಮತ್ತು ಕಾರ್ಯಸೂಚಿಯ ಕೊರತೆಯು ಭಾಗವಹಿಸುವವರನ್ನು ನಿರಾಶೆಗೊಳಿಸಬಹುದು, ಗಮನ ಕಳೆದುಕೊಳ್ಳಲು ಕಾರಣವಾಗಬಹುದು ಮತ್ತು ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
                    workplacePoints: -1
                },
                {
                    text: "Confusion and wasted time.",
                    text_kan: "ಗೊಂದಲ ಮತ್ತು ವ್ಯರ್ಥ ಸಮಯ",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1
                }
            ]
        },
        {
            id: 10,
            title: "Basic Courtesy and Teamwork",
            title_kan: "ನಿಮ್ಮ ವಸ್ತುಗಳು ಕುಟುಂಬಕ್ಕೆ ಸೇರುವಂತೆ ನೋಡಿಕೊಳ್ಳುವುದು",
            description: "Ravi notices his colleague never says “thank you” or “please” and often refuses to help with team projects",
            description_kan: "ತನ್ನ ಸಹೋದ್ಯೋಗಿ ಎಂದಿಗೂ 'ಧನ್ಯವಾದಗಳು' ಅಥವಾ 'ದಯವಿಟ್ಟು' ಎಂದು ಹೇಳುವುದಿಲ್ಲ ಮತ್ತು ತಂಡದ ಯೋಜನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಲು ನಿರಾಕರಿಸುವುದನ್ನು ರವಿ ಗಮನಿಸುತ್ತಾನೆ",
            question: "What is the likely impact of this behavior on the workplace?",
            question_kan: "ಈ ನಡವಳಿಕೆಯು ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಯಾವ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ?",
            options: [
                {
                    text: "It will improve team morale.",
                    text_kan: "ಇದು ತಂಡದ ನೈತಿಕತೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ",
                    feedback: "Incorrect. Lack of basic courtesy and unwillingness to help others typically lowers morale, not improves it.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಮೂಲಭೂತ ಸೌಜನ್ಯದ ಕೊರತೆ ಮತ್ತು ಇತರರಿಗೆ ಸಹಾಯ ಮಾಡಲು ಇಷ್ಟವಿಲ್ಲದಿರುವುದು ಸಾಮಾನ್ಯವಾಗಿ ನೈತಿಕತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ, ಅದನ್ನು ಸುಧಾರಿಸುವುದಿಲ್ಲ.",
                    workplacePoints: -1
                },
                {
                    text: "It will reduce employee motivation and teamwork.",
                    text_kan: "ಇದು ಉದ್ಯೋಗಿ ಪ್ರೇರಣೆ ಮತ್ತು ತಂಡದ ಕೆಲಸವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
                    feedback: "Correct.",
                    feedback_kan: "ಸರಿ.",
                    workplacePoints: 1
                },
                {
                    text: "It will have no effect.",
                    text_kan: "ಇದು ಯಾವುದೇ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.",
                    feedback: " Incorrect. It can lead to resentment, poor communication, and a decline in overall workplace atmosphere.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಅಸಮಾಧಾನ, ಕಳಪೆ ಸಂವಹನ ಮತ್ತು ಒಟ್ಟಾರೆ ಕೆಲಸದ ವಾತಾವರಣದಲ್ಲಿ ಕುಸಿತಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು.",
                    workplacePoints: -1
                },
                {
                    text: "It will make everyone more productive.",
                    text_kan: "ಇದು ಎಲ್ಲರನ್ನೂ ಹೆಚ್ಚು ಉತ್ಪಾದಕರನ್ನಾಗಿ ಮಾಡುತ್ತದೆ.",
                    feedback: " Incorrect. Refusing to help and lacking politeness can cause delays, miscommunication, and decreased motivation, all of which harm productivity.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸಹಾಯ ಮಾಡಲು ನಿರಾಕರಿಸುವುದು ಮತ್ತು ಸಭ್ಯತೆಯ ಕೊರತೆಯು ವಿಳಂಬ, ತಪ್ಪು ಸಂವಹನ ಮತ್ತು ಪ್ರೇರಣೆ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವಾಗಬಹುದು, ಇವೆಲ್ಲವೂ ಉತ್ಪಾದಕತೆಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
                    workplacePoints: -1
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
            const newworkplacePoints = workplacePoints + option.workplacePoints;

            // Update points based on the selected option
            setWorkplacePoints(newworkplacePoints);

            // Store the response for review later
            setScenarioResponses(prev => [ ...prev, {
                scenarioId: scenarios[ currentScenario ].id,
                title: scenarios[ currentScenario ].title,
                title_kan: scenarios[ currentScenario ].title_kan,
                selectedOption: scenarios[ currentScenario ].options[ selectedAnswer ].text,
                selectedOption_kan: scenarios[ currentScenario ].options[ selectedAnswer ].text_kan,
                feedback: scenarios[ currentScenario ].options[ selectedAnswer ].feedback,
                feedback_kan: scenarios[ currentScenario ].options[ selectedAnswer ].feedback_kan,
                workplaceDelta: option.workplacePoints
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
                const currentworkplace = workplacePointsRef.current;

                // Log the final calculations for debugging
                console.log("Final calculation:");
                console.log(`Total: ${currentworkplace}`);

                setGameState('results');
            }
        }
    };

    // FIXED getResult function with clearer condition checks
    const getResult = () => {
        // Calculate the total points
        const total = workplacePoints;

        // Log for debugging
        console.log(`getResult calculating total: ${total}`);

        // Check against thresholds in descending order
        if (total > 19) {
            // got highest score of 20
            return {
                level: "Workplace Etiquette Champion",
                level_kan: "ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಚಾಂಪಿಯನ್",
                message: "Congratulations! You have a deep understanding of workplace etiquette.",
                message_kan: "ಅಭಿನಂದನೆಗಳು! ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಬಗ್ಗೆ ನಿಮಗೆ ಆಳವಾದ ತಿಳುವಳಿಕೆ ಇದೆ."
            };
        }
        else if (total >= 10) {
            // got score between 10 and 19
            return {
                level: "Workplace Etiquette Leader",
                level_kan: "ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ನಾಯಕ",
                message: "You're doing well! Keep learning to become a Workplace Etiquette Champion.",
                message_kan: "ನೀವು ಚೆನ್ನಾಗಿದ್ದೀರಿ! ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಚಾಂಪಿಯನ್ ಆಗಲು ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ."
            };
        }
        else if (total > 0) {
            // got score between 1 and 9
            return {
                level: "Workplace Etiquette Learner",
                level_kan: "ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಕಲಿಕಾರ",
                message: "You have a good start but need to polish your Workplace Etiquette. Keep learning and growing.",
                message_kan: "ನೀವು ಉತ್ತಮ ಆರಂಭವನ್ನು ಹೊಂದಿದ್ದೀರಿ ಆದರೆ ನಿಮ್ಮ ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರವನ್ನು ಮೆರುಗುಗೊಳಿಸಬೇಕಾಗಿದೆ. ಕಲಿಯುತ್ತಿರಲಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರಲಿ."
            };
        }
        else {
            return {
                level: "Workplace Etiquette Beginner",
                level_kan: "ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಪ್ರಾರಂಭಿಕ",
                message: "It's time to play again and learn more about Workplace Etiquette.",
                message_kan: "ಮತ್ತೆ ಆಟವಾಡಲು ಮತ್ತು ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಇದು ಸಮಯ."
            };
        }
    };

    const resetGame = () => {
        setGameState('intro');
        setCurrentScenario(0);
        setWorkplacePoints(10);
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
            <div className="game-container">
                <div className="game-card">
                    <div className="card-header">
                        <h1>Workplace Etiquette Game</h1>
                        <h1>ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರ ಆಟ</h1>
                    </div>

                    <div className="card-body">
                        <img
                            src="/workplace.png"
                            alt="Workplace Etiquette Quiz Introduction"
                            style={{ width: "100%", display: "block", marginBottom: "1.5rem", borderRadius: "8px" }}
                        />
                        <h2>Welcome! ಸ್ವಾಗತ!</h2>
                        <p>You are about to test your knowledge of professional workplace behavior and etiquette. This quiz is designed to help you understand the essential skills needed to create a respectful, productive, and harmonious work environment.</p>
                        <p>
                            ವೃತ್ತಿಪರ ಕೆಲಸದ ಸ್ಥಳದ ನಡವಳಿಕೆ ಮತ್ತು ಶಿಷ್ಟಾಚಾರದ ಬಗ್ಗೆ ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಲಿದ್ದೀರಿ. ಗೌರವಾನ್ವಿತ, ಉತ್ಪಾದಕ ಮತ್ತು ಸಾಮರಸ್ಯದ ಕೆಲಸದ ವಾತಾವರಣವನ್ನು ಸೃಷ್ಟಿಸಲು ಅಗತ್ಯವಿರುವ ಅಗತ್ಯ ಕೌಶಲ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಈ ರಸಪ್ರಶ್ನೆಯನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.
                        </p>
                        <p>
                            Read each question carefully and consider the impact of different behaviors on workplace relationships. Think about what promotes respect, professionalism, and effective teamwork, and remember that good workplace etiquette benefits everyone!
                        </p>
                        <p>
                            ಪ್ರತಿ ಪ್ರಶ್ನೆಯನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಿ ಮತ್ತು ಕೆಲಸದ ಸ್ಥಳದ ಸಂಬಂಧಗಳ ಮೇಲೆ ವಿಭಿನ್ನ ನಡವಳಿಕೆಗಳ ಪ್ರಭಾವವನ್ನು ಪರಿಗಣಿಸಿ. ಗೌರವ, ವೃತ್ತಿಪರತೆ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಟೀಮ್‌ವರ್ಕ್ ಅನ್ನು ಉತ್ತೇಜಿಸುವ ಬಗ್ಗೆ ಯೋಚಿಸಿ ಮತ್ತು ಉತ್ತಮ ಕೆಲಸದ ಶಿಷ್ಟಾಚಾರವು ಎಲ್ಲರಿಗೂ ಪ್ರಯೋಜನವನ್ನು ನೀಡುತ್ತದೆ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ!
                        </p>

                        <div className="info-box">
                            <ul>
                                <li>You start with 10 points | ನೀವು 10 ಅಂಕಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ</li>
                                <li>Correct answer | ಸರಿಯಾದ ಉತ್ತರ : +1 point</li>
                                <li>Wrong answer | ತಪ್ಪು ಉತ್ತರ : -1 point</li>
                            </ul>
                        </div>

                        <button onClick={startGame} className="primary-button">
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
        const totalPoints = workplacePoints;

        return (
            <div className="game-container">
                <div className="game-card results-card">
                    <div className="card-header">
                        <h1>Game Results</h1>
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
                                        <div className={response.workplaceDelta > 0 ? "positive-points" : response.workplaceDelta < 0 ? "negative-points" : ""}>
                                            Points: {response.workplaceDelta > 0 ? '+' : ''}{response.workplaceDelta}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={resetGame} className="primary-button">
                            Play Again | ಮತ್ತೆ ಪ್ಲೇ ಮಾಡಿ <RefreshCcw className="icon" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Game Playing Screen
    return (
        <div className="game-container">
            <div className="game-card">
                <div className="card-header">
                    <h1>Q {currentScenario + 1}: {scenarios[ currentScenario ].title}</h1>
                    <h1>{scenarios[ currentScenario ].title_kan}</h1>
                    <div className="points-display">
                        <div className="point-badge workplace-badge">
                            Current Score: {workplacePoints}
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
                                className={`option-item ${selectedAnswer === index ? 'selected-option' : ''
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
                        <div className={`feedback-box ${scenarios[ currentScenario ].options[ selectedAnswer ].workplacePoints > 0
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
                                    scenarios[ currentScenario ].options[ selectedAnswer ].workplacePoints > 0
                                        ? "positive-points"
                                        : scenarios[ currentScenario ].options[ selectedAnswer ].workplacePoints < 0
                                            ? "negative-points"
                                            : ""
                                }>
                                    Points: {scenarios[ currentScenario ].options[ selectedAnswer ].workplacePoints > 0 ? '+' : ''}
                                    {scenarios[ currentScenario ].options[ selectedAnswer ].workplacePoints}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleNextScenario}
                        disabled={selectedAnswer === null}
                        className={`primary-button ${selectedAnswer === null ? 'disabled-button' : ''}`}
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

export default WorkplaceGame;