import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, RefreshCcw } from 'lucide-react';
import QuizAnalytics from '../utils/QuizAnalytics.js';
import './game.css';



const FinancialGame = () => {
    const [ gameState, setGameState ] = useState('intro');
    const [ currentScenario, setCurrentScenario ] = useState(0);
    const [ financialPoints, setFinancialPoints ] = useState(10);
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const [ answerSubmitted, setAnswerSubmitted ] = useState(false);
    const [ scenarioResponses, setScenarioResponses ] = useState([]);
    // For Quiz Analytics
    const [ sessionId, setSessionId ] = useState(null);
    const [ startTime, setStartTime ] = useState(null);

    // Use refs to track the latest values for calculations
    const financialPointsRef = useRef(financialPoints);

    // Update refs when state changes
    useEffect(() => {
        financialPointsRef.current = financialPoints;
    }, [ financialPoints ]);


    const scenarios = [
        {
            id: 1,
            title: "How to save",
            title_kan: "ಹೇಗೆ ಉಳಿಸುವುದು",
            description: "If you earn ₹15,000 after taxes, is it a good idea to set aside about ₹4,500 (30% of your money) for fun stuff you want, like going out or movies, using the 50/30/20 money rule, while still saving and paying for your basic needs?",
            description_kan: "ತೆರಿಗೆ ಪಾವತಿಸಿದ ನಂತರ ನೀವು ₹15,000 ಗಳಿಸಿದರೆ, 50/30/20 ಹಣದ ನಿಯಮವನ್ನು ಬಳಸಿಕೊಂಡು, ಹೊರಗೆ ಹೋಗುವುದು ಅಥವಾ ಚಲನಚಿತ್ರಗಳಂತಹ ನಿಮಗೆ ಬೇಕಾದ ಮೋಜಿನ ವಿಷಯಗಳಿಗಾಗಿ ಸುಮಾರು ₹4,500 (ನಿಮ್ಮ ಹಣದ 30%) ಅನ್ನು ಮೀಸಲಿಡುವುದು ಒಳ್ಳೆಯದು, ಆದರೆ ನಿಮ್ಮ ಮೂಲಭೂತ ಅಗತ್ಯಗಳಿಗಾಗಿ ಉಳಿಸಿ ಪಾವತಿಸಬೇಕು.",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "₹1,500",
                    text_kan: "",
                    feedback: "Incorrect. This is only 10%, but the 50/30/20 rule suggests spending 30% on wants.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಕೇವಲ 10%, ಆದರೆ 50/30/20 ನಿಯಮವು 30% ಅನ್ನು ಅಗತ್ಯಗಳಿಗಾಗಿ ಖರ್ಚು ಮಾಡುವುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
                    financialPoints: -1,
                },
                {
                    text: "₹4,500",
                    text_kan: "",
                    feedback: "Correct. 30% of ₹15,000 is ₹4,500, which should be used for fun and personal spending.",
                    feedback_kan: "ಸರಿ. ₹15,000 ರಲ್ಲಿ 30% ₹4,500 ಆಗಿದೆ, ಇದನ್ನು ವಿನೋದ ಮತ್ತು ವೈಯಕ್ತಿಕ ಖರ್ಚುಗಾಗಿ ಬಳಸಬೇಕು",
                    financialPoints: 1,
                },
                {
                    text: "₹7,500",
                    text_kan: "",
                    feedback: "Incorrect. This is 50% of your income, which should be allocated to needs, not wants.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ನಿಮ್ಮ ಆದಾಯದ 50% ಆಗಿದೆ, ಇದನ್ನು ಅಗತ್ಯಗಳಿಗೆ ಹಂಚಬೇಕು, ಅಗತ್ಯಗಳಿಗೆ ಅಲ್ಲ.",
                    financialPoints: -1,
                }
            ]
        },
        {
            id: 2,
            title: "Where to Keep Your Emergency Money",
            title_kan: "ತುರ್ತು ಹಣವನ್ನು ಎಲ್ಲಿ ಇಡುವುದು",
            description: "If you have ₹37,500 saved for emergencies (like 6 months of your usual spending), is it smarter to keep this money in a savings account that pays a bit more interest or in a special fund you can get quickly, instead of putting it in a Fixed Deposit (FD) where your money is locked away for a long time?",
            description_kan: "ನಿಮ್ಮಲ್ಲಿ ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳಿಗಾಗಿ (ನಿಮ್ಮ ಸಾಮಾನ್ಯ ಖರ್ಚಿನ 6 ತಿಂಗಳುಗಳಂತೆ) ₹37,500 ಉಳಿಸಿದ್ದರೆ, ಈ ಹಣವನ್ನು ನಿಮ್ಮ ಹಣವು ದೀರ್ಘಕಾಲದವರೆಗೆ ಲಾಕ್ ಆಗಿರುವ ಸ್ಥಿರ ಠೇವಣಿ (FD)ಯಲ್ಲಿ ಇಡುವ ಬದಲು, ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಬಡ್ಡಿಯನ್ನು ನೀಡುವ ಉಳಿತಾಯ ಖಾತೆಯಲ್ಲಿ ಅಥವಾ ನೀವು ಬೇಗನೆ ಪಡೆಯಬಹುದಾದ ವಿಶೇಷ ನಿಧಿಯಲ್ಲಿ ಇಡುವುದು ಉತ್ತಮವೇ?",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "In a Fixed Deposit (FD) where it's locked up for a long time",
                    text_kan: "ಸ್ಥಿರ ಠೇವಣಿ (FD)ಯಲ್ಲಿ ಅದು ದೀರ್ಘಕಾಲದವರೆಗೆ ಲಾಕ್ ಆಗಿರುತ್ತದೆ",
                    feedback: "Incorrect. FDs are not easily accessible and may charge penalties if withdrawn early.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. FDಗಳನ್ನು ಸುಲಭವಾಗಿ ಪ್ರವೇಶಿಸಲಾಗುವುದಿಲ್ಲ ಮತ್ತು ಮುಂಚಿತವಾಗಿ ಹಿಂತೆಗೆದುಕೊಂಡರೆ ದಂಡ ವಿಧಿಸಬಹುದು",
                    financialPoints: -1,
                },
                {
                    text: "In a savings account that pays a bit more interest or a special fund you can get quickly",
                    text_kan: "ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಬಡ್ಡಿಯನ್ನು ಪಾವತಿಸುವ ಉಳಿತಾಯ ಖಾತೆಯಲ್ಲಿ ಅಥವಾ ನೀವು ಬೇಗನೆ ಪಡೆಯಬಹುದಾದ ವಿಶೇಷ ನಿಧಿಯಲ್ಲಿ",
                    feedback: "Correct. Emergency funds should be liquid, safe, and easily accessible.",
                    feedback_kan: "ಸರಿ. ತುರ್ತು ನಿಧಿಗಳು ದ್ರವ, ಸುರಕ್ಷಿತ ಮತ್ತು ಸುಲಭವಾಗಿ ಪ್ರವೇಶಿಸಬಹುದಾದಂತಿರಬೇಕು",
                    financialPoints: 1,
                },
                {
                    text: "Buried in your backyard",
                    text_kan: "ನಿಮ್ಮ ಹಿತ್ತಲಿನಲ್ಲಿ ಹೂತುಹಾಕಲಾಗಿದೆ",
                    feedback: "Incorrect. This is unsafe and doesn’t protect your money from theft or damage.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಅಸುರಕ್ಷಿತವಾಗಿದೆ ಮತ್ತು ನಿಮ್ಮ ಹಣವನ್ನು ಕಳ್ಳತನ ಅಥವಾ ಹಾನಿಯಿಂದ ರಕ್ಷಿಸುವುದಿಲ್ಲ",
                    financialPoints: -1,
                }
            ]
        },
        {
            id: 3,
            title: "Pay Debt First or Buy New Things?",
            title_kan: "ಮೊದಲು ಸಾಲವನ್ನು ಪಾವತಿಸಬೇಕಾ ಅಥವಾ ಹೊಸ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸಬೇಕಾ?",
            description: "You have credit card debt with a very high interest rate. Is it smarter to pay that off first, even if it delays buying a new appliance on loan?",
            description_kan: "ನಿಮಗೆ ಹೆಚ್ಚಿನ ಬಡ್ಡಿದರದ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಾಲವಿದೆ. ಸಾಲದ ಮೇಲೆ ಹೊಸ ಉಪಕರಣವನ್ನು ಖರೀದಿಸಲು ವಿಳಂಬವಾದರೂ, ಅದನ್ನು ಮೊದಲು ಪಾವತಿಸುವುದು ಬುದ್ಧಿವಂತವೇ?",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "Yes",
                    text_kan: "ಹೌದು",
                    feedback: "Correct. High-interest debt like credit card bills should be cleared quickly to avoid large interest costs.",
                    feedback_kan: "ಸರಿ. ದೊಡ್ಡ ಬಡ್ಡಿ ವೆಚ್ಚಗಳನ್ನು ತಪ್ಪಿಸಲು ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಬಿಲ್‌ಗಳಂತಹ ಹೆಚ್ಚಿನ ಬಡ್ಡಿ ಸಾಲವನ್ನು ತ್ವರಿತವಾಗಿ ತೆರವುಗೊಳಿಸಬೇಕು",
                    financialPoints: 1
                },
                {
                    text: "No.",
                    text_kan: "ಇಲ್ಲ.",
                    feedback: "Incorrect. Ignoring high-interest debt can lead to bigger financial problems over time.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಹೆಚ್ಚಿನ ಬಡ್ಡಿ ಸಾಲವನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದು ಕಾಲಾನಂತರದಲ್ಲಿ ದೊಡ್ಡ ಆರ್ಥಿಕ ಸಮಸ್ಯೆಗಳಿಗೆ ಕಾರಣವಾಗಬಹುದು",
                    financialPoints: -1
                },
                {
                    text: "Maybe, depending on the appliance.",
                    text_kan: "ಬಹುಶಃ, ಉಪಕರಣವನ್ನು ಅವಲಂಬಿಸಿ.",
                    feedback: "Incorrect. Prioritizing debt repayment is almost always smarter than new spending.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಸಾಲ ಮರುಪಾವತಿಗೆ ಆದ್ಯತೆ ನೀಡುವುದು ಯಾವಾಗಲೂ ಹೊಸ ಖರ್ಚುಗಿಂತ ಬುದ್ಧಿವಂತವಾಗಿರುತ್ತದೆ.",
                    financialPoints: -1
                }
            ]
        },
        {
            id: 4,
            title: "What You Own vs What You Owe",
            title_kan: "ನೀವು ಏನು ಹೊಂದಿದ್ದೀರಿ vs ನೀವು ಏನು ನೀಡಬೇಕಾಗಿದೆ",
            description: "Which of these is something you owe (a liability)?",
            description_kan: "ಇವುಗಳಲ್ಲಿ ನೀವು ಯಾವ ಸಾಲಕ್ಕೆ (ಬಾಧ್ಯತೆ) ಬದ್ಧರಾಗಿರುತ್ತೀರಿ?",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "Your house that you own.",
                    text_kan: "ನೀವು ಹೊಂದಿರುವ ನಿಮ್ಮ ಮನೆ.",
                    feedback: "Incorrect. This is an asset unless it's fully mortgaged.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಸಂಪೂರ್ಣವಾಗಿ ಅಡಮಾನ ಇಡದ ಹೊರತು ಇದು ಒಂದು ಆಸ್ತಿಯಾಗಿದೆ.",
                    financialPoints: -1,
                },
                {
                    text: "The loan you took to buy your car.",
                    text_kan: "ನಿಮ್ಮ ಕಾರನ್ನು ಖರೀದಿಸಲು ನೀವು ತೆಗೆದುಕೊಂಡ ಸಾಲ.",
                    feedback: "Correct. Loans are liabilities because they are debts you owe.",
                    feedback_kan: "ಸರಿ. ಸಾಲಗಳು ಹೊಣೆಗಾರಿಕೆಗಳಾಗಿವೆ ಏಕೆಂದರೆ ಅವು ನೀವು ಪಾವತಿಸಬೇಕಾದ ಸಾಲಗಳಾಗಿವೆ.",
                    financialPoints: 1,
                },
                {
                    text: "Your jewelry.",
                    text_kan: "ನಿಮ್ಮ ಆಭರಣಗಳು.",
                    feedback: "Incorrect. Jewelry is an asset, as it holds value and can be sold or used.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಆಭರಣವು ಒಂದು ಆಸ್ತಿಯಾಗಿದೆ, ಏಕೆಂದರೆ ಅದು ಮೌಲ್ಯವನ್ನು ಹೊಂದಿದೆ ಮತ್ತು ಮಾರಾಟ ಮಾಡಬಹುದು ಅಥವಾ ಬಳಸಬಹುದು.",
                    financialPoints: -1,
                }
            ]
        },
        {
            id: 5,
            title: "Best Way to Save for Many Years",
            title_kan: "ಬಹಳ ವರ್ಷಗಳ ಕಾಲ ಉಳಿಸುವ ಉತ್ತಮ ಮಾರ್ಗ",
            description: "For saving money over many years and getting tax benefits, which option is usually better?",
            description_kan: "ಹಲವು ವರ್ಷಗಳಿಂದ ಹಣವನ್ನು ಉಳಿಸಲು ಮತ್ತು ತೆರಿಗೆ ಪ್ರಯೋಜನಗಳನ್ನು ಪಡೆಯಲು, ಯಾವ ಆಯ್ಕೆ ಸಾಮಾನ್ಯವಾಗಿ ಉತ್ತಮವಾಗಿರುತ್ತದೆ?",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "A regular bank Recurring Deposit (RD)",
                    text_kan: "ನಿಯಮಿತ ಬ್ಯಾಂಕ್ ಮರುಕಳಿಸುವ ಠೇವಣಿ (RD)",
                    feedback: "Incorrect. RDs have limited tax benefits and lower returns.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. RD ಗಳು ಸೀಮಿತ ತೆರಿಗೆ ಪ್ರಯೋಜನಗಳನ್ನು ಮತ್ತು ಕಡಿಮೆ ಆದಾಯವನ್ನು ಹೊಂದಿವೆ.",
                    financialPoints: -1,
                },
                {
                    text: "A Public Provident Fund (PPF) account.",
                    text_kan: "ಸಾರ್ವಜನಿಕ ಭವಿಷ್ಯ ನಿಧಿ (PPF) ಖಾತೆ.",
                    feedback: "Correct. PPF offers tax benefits, compound interest, and long-term savings security.",
                    feedback_kan: "ಸರಿ. PPF ತೆರಿಗೆ ಪ್ರಯೋಜನಗಳು, ಸಂಯುಕ್ತ ಬಡ್ಡಿ ಮತ್ತು ದೀರ್ಘಾವಧಿಯ ಉಳಿತಾಯ ಭದ್ರತೆಯನ್ನು ನೀಡುತ್ತದೆ.",
                    financialPoints: 1,
                },
                {
                    text: "Saving it all under your pillow.",
                    text_kan: "ನಿಮ್ಮ ದಿಂಬಿನ ಕೆಳಗೆ ಎಲ್ಲವನ್ನೂ ಉಳಿಸುವುದು.",
                    feedback: "Incorrect. This earns no interest and is unsafe.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಯಾವುದೇ ಬಡ್ಡಿಯನ್ನು ಗಳಿಸುವುದಿಲ್ಲ ಮತ್ತು ಅಸುರಕ್ಷಿತವಾಗಿದೆ.",
                    financialPoints: -1,
                }
            ]
        },
        {
            id: 6,
            title: "How Much to Spend on Credit Cards",
            title_kan: "ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್‌ಗಳಲ್ಲಿ ಎಷ್ಟು ಖರ್ಚು ಮಾಡಬೇಕು",
            description: "To keep your CIBIL score (credit report card) healthy, if your credit card limit is ₹30,000, how much should you try to spend below each month?",
            description_kan: "ನಿಮ್ಮ CIBIL ಸ್ಕೋರ್ (ಕ್ರೆಡಿಟ್ ರಿಪೋರ್ಟ್ ಕಾರ್ಡ್) ಅನ್ನು ಆರೋಗ್ಯಕರವಾಗಿಡಲು, ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಮಿತಿ ₹30,000 ಆಗಿದ್ದರೆ, ನೀವು ಪ್ರತಿ ತಿಂಗಳು ಎಷ್ಟು ಕಡಿಮೆ ಖರ್ಚು ಮಾಡಲು ಪ್ರಯತ್ನಿಸಬೇಕು?",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "₹30,000 (use it all!)",
                    text_kan: "₹30,000 (ಎಲ್ಲವನ್ನೂ ಬಳಸಿ!)",
                    feedback: "Incorrect. Using your full credit limit can harm your credit score.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ನಿಮ್ಮ ಪೂರ್ಣ ಕ್ರೆಡಿಟ್ ಮಿತಿಯನ್ನು ಬಳಸುವುದರಿಂದ ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್‌ಗೆ ಹಾನಿಯಾಗಬಹುದು.",
                    financialPoints: -1,
                },
                {
                    text: "₹9,000 (30% of the limit)",
                    text_kan: "₹9,000 (ಮಿತಿಯ 30%)",
                    feedback: "Correct. Staying below 30% usage shows responsible credit behavior.",
                    feedback_kan: "ಸರಿ. 30% ಬಳಕೆಗಿಂತ ಕಡಿಮೆ ಇರುವುದು ಜವಾಬ್ದಾರಿಯುತ ಕ್ರೆಡಿಟ್ ನಡವಳಿಕೆಯನ್ನು ತೋರಿಸುತ್ತದೆ.",
                    financialPoints: 1,
                },
                {
                    text: "₹1,000 (don't use it at all)",
                    text_kan: "₹1,000 (ಅದನ್ನು ಬಳಸಲೇಬೇಡಿ)",
                    feedback: "Incorrect. Not using your credit card at all doesn’t build a credit history.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಅನ್ನು ಬಳಸದಿರುವುದು ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸವನ್ನು ನಿರ್ಮಿಸುವುದಿಲ್ಲ.",
                    financialPoints: -1,
                }
            ]
        },
        {
            id: 7,
            title: "Easy Way to Invest in Many Companies",
            title_kan: "ಹಲವು ಕಂಪನಿಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ಸುಲಭ ಮಾರ್ಗ",
            description: "If you want to invest in many different Indian companies and government bonds but don't have much time to research, which is usually a good choice?",
            description_kan: "ನೀವು ವಿವಿಧ ಭಾರತೀಯ ಕಂಪನಿಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಬಾಂಡ್‌ಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ಬಯಸಿದರೆ ಆದರೆ ಸಂಶೋಧನೆ ಮಾಡಲು ಹೆಚ್ಚು ಸಮಯವಿಲ್ಲದಿದ್ದರೆ, ಸಾಮಾನ್ಯವಾಗಿ ಯಾವುದು ಉತ್ತಮ ಆಯ್ಕೆ?",
            question: "",
            question_kan: "",
            options: [
                {
                    text: "Picking individual stocks yourself.",
                    text_kan: "ವೈಯಕ್ತಿಕ ಷೇರುಗಳನ್ನು ನೀವೇ ಆರಿಸಿಕೊಳ್ಳುವುದು.",
                    feedback: "Incorrect. This takes time, research, and carries higher risk.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಇದು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ, ಸಂಶೋಧನೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಹೆಚ್ಚಿನ ಅಪಾಯವನ್ನು ಹೊಂದಿರುತ್ತದೆ.",
                    financialPoints: -1,
                },
                {
                    text: "Investing in Exchange-Traded Funds (ETFs) or Index Mutual Funds.",
                    text_kan: "ಎಕ್ಸ್ಚೇಂಜ್-ಟ್ರೇಡೆಡ್ ಫಂಡ್‌ಗಳು (ETFಗಳು) ಅಥವಾ ಸೂಚ್ಯಂಕ ಮ್ಯೂಚುಯಲ್ ಫಂಡ್‌ಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡುವುದು.",
                    feedback: "Correct. These offer diversification and require less effort to manage.",
                    feedback_kan: "ಸರಿ. ಇವು ವೈವಿಧ್ಯೀಕರಣವನ್ನು ನೀಡುತ್ತವೆ ಮತ್ತು ನಿರ್ವಹಿಸಲು ಕಡಿಮೆ ಶ್ರಮ ಬೇಕಾಗುತ್ತದೆ.",
                    financialPoints: 1
                },
                {
                    text: "Just keeping all your money in cash.",
                    text_kan: "ನಿಮ್ಮ ಎಲ್ಲಾ ಹಣವನ್ನು ನಗದು ರೂಪದಲ್ಲಿ ಇಡುವುದು.",
                    feedback: "Incorrect. Cash loses value over time due to inflation and doesn't grow.",
                    feedback_kan: "ತಪ್ಪಾಗಿದೆ. ಹಣದುಬ್ಬರದಿಂದಾಗಿ ನಗದು ಕಾಲಾನಂತರದಲ್ಲಿ ಮೌಲ್ಯವನ್ನು ಕಳೆದುಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು ಬೆಳೆಯುವುದಿಲ್ಲ.",
                    financialPoints: -1
                }
            ]
        },
        {
            id: 8,
            title: "Extra Health Insurance Coverage",
            title_kan: "ಹೆಚ್ಚುವರಿ ಆರೋಗ್ಯ ವಿಮಾ ರಕ್ಷಣೆ",
            description: "What does a Super Top-Up Health Insurance policy mainly do?",
            question: "",
            options: [
                {
                    text: "It replaces your main health insurance policy completely.",
                    feedback: "Incorrect. It adds extra coverage, not a replacement.",
                    financialPoints: -1
                },
                {
                    text: "It provides extra coverage for big medical bills after your main health insurance has paid all it can.",
                    feedback: "Correct. It helps cover large medical expenses beyond your base policy.",
                    financialPoints: 1
                },
                {
                    text: "It only covers small doctor visits.",
                    feedback: "Incorrect. It's meant for major medical bills, not minor expenses.",
                    financialPoints: -1
                }
            ]
        },
        {
            id: 9,
            title: "Young People Saving for Old Age",
            title_kan: "ವೃದ್ಧಾಪ್ಯಕ್ಕಾಗಿ ಯುವಕರು ಉಳಿತಾಯ ಮಾಡುತ್ತಿದ್ದಾರೆ",
            description: "If you're a young person (in your 30s) saving for retirement with NPS, is it usually smarter to put more of your money into stocks for potentially higher growth, even if the market goes up and down?",
            question: "",
            options: [
                {
                    text: "Yes.",
                    feedback: "Correct. Younger investors can take more risk because they have time to recover from market fluctuations.",
                    financialPoints: 1
                },
                {
                    text: "No.",
                    feedback: "Incorrect. Being too conservative early can limit your retirement growth.",
                    financialPoints: -1
                },
                {
                    text: "Only if you’re earning a lot already.",
                    feedback: "Incorrect. Regardless of income, younger people benefit from growth-focused investing.",
                    financialPoints: -1
                }
            ]
        },
        {
            id: 10,
            title: "Making Sure Family Inherits Your Things",
            title_kan: "ನಿಮ್ಮ ವಸ್ತುಗಳು ಕುಟುಂಬಕ್ಕೆ ಸೇರುವಂತೆ ನೋಡಿಕೊಳ್ಳುವುದು",
            description: "To make sure all your valuable things (like your house, land, and money) go to your loved ones exactly how you want after you're gone, what's the most complete legal step?",
            question: "",
            options: [
                {
                    text: "Just telling your family what you want.",
                    feedback: "Incorrect. Verbal wishes are not legally binding.",
                    financialPoints: -1
                },
                {
                    text: "Making nominations for individual bank accounts.",
                    feedback: " Incorrect. Nominations help with specific accounts but aren’t a full solution.",
                    financialPoints: -1
                },
                {
                    text: "Writing a proper Will.",
                    feedback: "Correct. A Will is a legal document that ensures your assets are distributed as per your wishes.",
                    financialPoints: 1
                }
            ]
        }
    ];

    const handleOptionSelect = (optionIndex) => {
        setSelectedAnswer(optionIndex);
    };

    // FIXED FUNCTION to properly handle scenario progression and score calculation
    const handleNextScenario = async () => {
        // If an answer hasn't been submitted yet and an option is selected
        if (!answerSubmitted && selectedAnswer !== null) {
            // Get the selected option for the current scenario
            const option = scenarios[ currentScenario ].options[ selectedAnswer ];

            // Calculate new points
            const newFinancialPoints = financialPoints + option.financialPoints;

            // Update points based on the selected option
            setFinancialPoints(newFinancialPoints);

            // Store the response for review later
            setScenarioResponses(prev => [ ...prev, {
                scenarioId: scenarios[ currentScenario ].id,
                title: scenarios[ currentScenario ].title,
                title_kan: scenarios[ currentScenario ].title_kan,
                selectedOption: scenarios[ currentScenario ].options[ selectedAnswer ].text,
                selectedOption_kan: scenarios[ currentScenario ].options[ selectedAnswer ].text_kan,
                feedback: scenarios[ currentScenario ].options[ selectedAnswer ].feedback,
                feedback_kan: scenarios[ currentScenario ].options[ selectedAnswer ].feedback_kan,
                financialDelta: option.financialPoints
            } ]);

            // Mark that an answer has been submitted for this scenario
            setAnswerSubmitted(true);
        }
        // If an answer has already been submitted, move to next scenario or results
        else if (answerSubmitted) {
            const timeTaken = Math.round((Date.now() - startTime) / 1000);
            // Record the response
            if (sessionId) {
                await QuizAnalytics.recordResponse(
                    sessionId,
                    currentScenario,
                    scenarios[ currentScenario ].id,
                    selectedAnswer,
                    scenarios[ currentScenario ].options[ selectedAnswer ].points,
                    timeTaken
                );

                // Update session progress
                await QuizAnalytics.updateSessionProgress(
                    sessionId,
                    currentScenario + 1,
                    financialPointsRef.current,
                    currentScenario + 1
                );
            }

            // Check if there are more scenarios to show
            if (currentScenario < scenarios.length - 1) {
                // Move to the next scenario
                setCurrentScenario(prevScenario => prevScenario + 1);
                setSelectedAnswer(null);
                setAnswerSubmitted(false);
            } else {
                // We're at the last scenario, calculate equity points and show results

                // Use the refs to ensure we have the latest values
                const currentFinancial = financialPointsRef.current;

                // Log the final calculations for debugging
                console.log("Final calculation:");
                console.log(`Total: ${currentFinancial}`);

                if (sessionId) {
                    await QuizAnalytics.completeQuizSession(sessionId, currentFinancial);
                }

                setGameState('results');
            }
        }
    };

    // FIXED getResult function with clearer condition checks
    const getResult = () => {
        // Calculate the total points
        const total = financialPoints;

        // Log for debugging
        console.log(`getResult calculating total: ${total}`);

        // Check against thresholds in descending order
        if (total > 19) {
            // got highest score of 20
            return {
                level: "Finance Champion",
                level_kan: "ಆರ್ಥಿಕ ಚಾಂಪಿಯನ್",
                message: "Congratulations! You have a deep understanding of personal finance.",
                message_kan: "ಅಭಿನಂದನೆಗಳು! ನಿಮಗೆ ವೈಯಕ್ತಿಕ ಹಣಕಾಸಿನ ಬಗ್ಗೆ ಆಳವಾದ ಅರಿವು ಇದೆ."
            };
        }
        else if (total >= 10) {
            // got score between 10 and 19
            return {
                level: "Finance Leader",
                level_kan: "ಆರ್ಥಿಕ ನಾಯಕ",
                message: "You're doing well! Keep learning to become a Finance Champion.",
                message_kan: "ನೀವು ಚೆನ್ನಾಗಿದ್ದೀರಿ! ಆರ್ಥಿಕ ಚಾಂಪಿಯನ್ ಆಗಲು ಕಲಿಯುತ್ತಿರಲಿ."
            };
        }
        else if (total > 0) {
            // got score between 1 and 9
            return {
                level: "Finance Learner",
                level_kan: "ಆರ್ಥಿಕ ಕಲಿಕಾರ",
                message: "You have a good start but need to polish your personal finance skills. Keep learning and growing.",
                message_kan: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಹಣಕಾಸು ಕೌಶಲ್ಯಗಳನ್ನು ತೀಕ್ಷ್ಣಗೊಳಿಸಲು ನೀವು ಉತ್ತಮ ಪ್ರಾರಂಭವನ್ನು ಹೊಂದಿದ್ದೀರಿ. ಕಲಿಯುತ್ತಿರಲಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರಲಿ."
            };
        }
        else {
            return {
                level: "Finance Beginner",
                level_kan: "ಆರ್ಥಿಕ ಪ್ರಾರಂಭಿಕ",
                message: "It's time to play again and learn more about personal finance.",
                message_kan: "ವೈಯಕ್ತಿಕ ಹಣಕಾಸು ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ಕಲಿಯಲು ಮತ್ತೆ ಆಟವಾಡುವ ಸಮಯವಾಗಿದೆ."
            };
        }
    };

    const resetGame = () => {
        setGameState('intro');
        setCurrentScenario(0);
        setFinancialPoints(10);
        setSelectedAnswer(null);
        setAnswerSubmitted(false);
        setScenarioResponses([]);
    };

    const startGame = async () => {
        const sessionId = await QuizAnalytics.startQuizSession('inclusion');
        setSessionId(sessionId);
        setStartTime(Date.now());
        setGameState('playing');
    };

    // Calculate progress percentage
    const progressPercentage = ((currentScenario + 1) / scenarios.length) * 100;

    // Introduction Screen
    if (gameState === 'intro') {
        return (
            <div className="game-container orange">
                <div className="game-card">
                    <div className="card-header orange">
                        <h1>Financial Literacy Quiz</h1>
                        <h1>ಆರ್ಥಿಕ ಸಾಕ್ಷರತಾ ರಸಪ್ರಶ್ನೆ</h1>
                        <p>Learn to manage your finances</p>
                        <p>ನಿಮ್ಮ ಹಣಕಾಸನ್ನು ನಿರ್ವಹಿಸಲು ಕಲಿಯಿರಿ</p>
                    </div>

                    <div className="card-body">
                        <img
                            src="/financial.jpg"
                            alt="Financial Literacy Quiz Introduction"
                            style={{ width: "100%", display: "block", marginBottom: "1.5rem", borderRadius: "8px" }}
                        />
                        <h2>Welcome! ಸ್ವಾಗತ!</h2>
                        <p>This quiz will help you learn smart ways to handle your money every day. We&apos;ll ask you 10 questions about saving, spending, and planning for your future.</p>
                        <p>
                            ಈ ರಸಪ್ರಶ್ನೆಯು ಪ್ರತಿದಿನ ನಿಮ್ಮ ಹಣವನ್ನು ಹೇಗೆ ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ನಿರ್ವಹಿಸುವುದು ಎಂಬುದನ್ನು ಕಲಿಯಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಉಳಿತಾಯ, ಖರ್ಚು ಮತ್ತು ನಿಮ್ಮ ಭವಿಷ್ಯದ ಯೋಜನೆ ಕುರಿತು ನಾವು ನಿಮಗೆ 10 ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳುತ್ತೇವೆ.
                        </p>
                        <p>
                            Managing money wisely can help you and your family live better. These questions are about real situations you might face - like how to save money, use credit cards smartly, and plan for emergencies.
                        </p>
                        <p>
                            ಹಣವನ್ನು ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ನಿರ್ವಹಿಸುವುದರಿಂದ ನೀವು ಮತ್ತು ನಿಮ್ಮ ಕುಟುಂಬ ಉತ್ತಮವಾಗಿ ಬದುಕಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಈ ಪ್ರಶ್ನೆಗಳು ನೀವು ಎದುರಿಸಬಹುದಾದ ನೈಜ ಸನ್ನಿವೇಶಗಳ ಬಗ್ಗೆ - ಹಣವನ್ನು ಹೇಗೆ ಉಳಿಸುವುದು, ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್‌ಗಳನ್ನು ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬಳಸುವುದು ಮತ್ತು ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಯೋಜನೆ ಮಾಡುವುದು ಹೇಗೆ ಎಂಬುದರ ಕುರಿತು.
                        </p>

                        <div className="info-box">
                            <ul>
                                <li>You start with 10 points | ನೀವು 10 ಅಂಕಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ</li>
                                <li>Correct answer | ಸರಿಯಾದ ಉತ್ತರ : +1 point</li>
                                <li>Wrong answer | ತಪ್ಪು ಉತ್ತರ : -1 point</li>
                            </ul>
                        </div>

                        <button onClick={startGame} className="primary-button orange">
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
        const totalPoints = financialPoints;

        return (
            <div className="game-container orange">
                <div className="game-card results-card">
                    <div className="card-header orange">
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
                                        <div className={response.financialDelta > 0 ? "positive-points" : response.financialDelta < 0 ? "negative-points" : ""}>
                                            Points: {response.financialDelta > 0 ? '+' : ''}{response.financialDelta}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={resetGame} className="primary-button orange">
                            Play Again | ಮತ್ತೆ ಪ್ಲೇ ಮಾಡಿ <RefreshCcw className="icon" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Game Playing Screen
    return (
        <div className="game-container orange">
            <div className="game-card">
                <div className="card-header orange">
                    <h1>Q {currentScenario + 1}: {scenarios[ currentScenario ].title}</h1>
                    <h1>{scenarios[ currentScenario ].title_kan}</h1>
                    <div className="points-display">
                        <div className="point-badge primary-badge">
                            Current Score: {financialPoints}
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
                                className={`option-item orange ${selectedAnswer === index ? 'selected-option' : ''
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
                        <div className={`feedback-box ${scenarios[ currentScenario ].options[ selectedAnswer ].financialPoints > 0
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
                                    scenarios[ currentScenario ].options[ selectedAnswer ].financialPoints > 0
                                        ? "positive-points"
                                        : scenarios[ currentScenario ].options[ selectedAnswer ].financialPoints < 0
                                            ? "negative-points"
                                            : ""
                                }>
                                    Points: {scenarios[ currentScenario ].options[ selectedAnswer ].financialPoints > 0 ? '+' : ''}
                                    {scenarios[ currentScenario ].options[ selectedAnswer ].financialPoints}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleNextScenario}
                        disabled={selectedAnswer === null}
                        className={`primary-button ${selectedAnswer === null ? 'disabled-button' : ''}  orange`}
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

export default FinancialGame;