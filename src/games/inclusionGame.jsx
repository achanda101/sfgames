import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, RefreshCcw } from 'lucide-react';
import './game.css';


const InclusionGame = () => {
    const [ gameState, setGameState ] = useState('intro');
    const [ currentScenario, setCurrentScenario ] = useState(0);
    const [ inclusionPoints, setInclusionPoints ] = useState(10);
    const [ diversityPoints, setDiversityPoints ] = useState(10);
    const [ equityPoints, setEquityPoints ] = useState(0);
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const [ answerSubmitted, setAnswerSubmitted ] = useState(false);
    const [ scenarioResponses, setScenarioResponses ] = useState([]);

    // Use refs to track the latest values for calculations
    const inclusionPointsRef = useRef(inclusionPoints);
    const diversityPointsRef = useRef(diversityPoints);

    // Update refs when state changes
    useEffect(() => {
        inclusionPointsRef.current = inclusionPoints;
        diversityPointsRef.current = diversityPoints;
    }, [ inclusionPoints, diversityPoints ]);


    const scenarios = [
        {
            id: 1,
            title: "Interview Time!",
            description: "You are interviewing Arvind for the Admin Manager position. Arvind is wearing a bindi but also has facial hair and is wearing a shirt and pants. Their name does not indicate their gender identity.",
            question: "What do you do?",
            options: [
                {
                    text: "Ask about their education and start the conversation.",
                    feedback: "This is a safe approach but might seem like you are avoiding the topic of gender identity. A more inclusive way is to lead by example—introduce yourself with your name and pronouns.",
                    inclusionPoints: 0,
                    diversityPoints: 0
                },
                {
                    text: "Introduce yourself with your name and pronouns (e.g., \"Hi, I'm Ramu, and I use he/him pronouns\").",
                    feedback: "Excellent choice! By sharing your pronouns, you create a safe space for Arvind to share theirs if they choose to.",
                    inclusionPoints: 1,
                    diversityPoints: 1
                },
                {
                    text: "Ask if they use she/her pronouns.",
                    feedback: "It's good that you want to be respectful, but asking directly can feel invasive. It's better to lead by example by sharing your own pronouns first.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 2,
            title: "Washroom Concerns",
            description: "Amala, a senior manager, questions why transgender women are allowed to use the women's washroom despite having a gender-inclusive washroom.",
            question: "What do you do?",
            options: [
                {
                    text: "Explain to Amala that transgender women are women and deserve to be treated with respect and dignity.",
                    feedback: "Great response! True inclusivity respects individuals' identities and ensures they are treated with dignity.",
                    inclusionPoints: 2,
                    diversityPoints: 0
                },
                {
                    text: "Agree to disagree because you feel uncomfortable discussing it.",
                    feedback: "Avoiding the conversation does not resolve the issue. It's important to address concerns with empathy and accurate information.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Sternly tell Amala that she needs to learn about transgender rights.",
                    feedback: "While Amala might need more awareness, approaching the conversation with empathy fosters understanding and acceptance more effectively.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 3,
            title: "Out or About?",
            description: "You overhear Priya discussing the sexual orientation of another employee without their consent.",
            explainer: "Outing is revealing someone's LGBTQ+ identity without their consent, potentially impacting their safety, relationships, or professional life.",
            question: "What do you do?",
            options: [
                {
                    text: "Approach Priya privately and explain the importance of respecting others' privacy.",
                    feedback: "Excellent choice! This approach maintains confidentiality and educates Priya on respecting personal boundaries.",
                    inclusionPoints: 2,
                    diversityPoints: 0
                },
                {
                    text: "Ignore the conversation since it wasn't meant maliciously.",
                    feedback: "Ignoring the situation perpetuates a culture of gossip and invasion of privacy. It's crucial to address such matters respectfully.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Confront Priya in front of others to make a point about respect.",
                    feedback: "While it's important to address the issue, public confrontation can lead to defensiveness. Private conversations are more effective for learning and growth.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 4,
            title: "Hire! Hire!",
            description: "Your team is hiring for a leadership role. One candidate, Tanvi, is from the LGBTIAQ+ community and another, Arjun, is a cisgender man. Both have equal qualifications.",
            explainer: "Cisgender refers to someone whose gender identity matches the sex they were assigned at birth.",
            question: "What do you do?",
            options: [
                {
                    text: "Choose Tanvi to promote diversity.",
                    feedback: "While promoting diversity is important, decisions should be based on qualifications, skills, and the value they bring to the team, rather than identity alone.",
                    inclusionPoints: 0,
                    diversityPoints: -2
                },
                {
                    text: "Choose the candidate who best aligns with the team's needs, regardless of identity.",
                    feedback: "Perfect! This approach ensures equal opportunity without bias. Diversity is about inclusivity, not tokenism.",
                    inclusionPoints: 0,
                    diversityPoints: 2
                },
                {
                    text: "Seek feedback from the team about which candidate they feel comfortable working with.",
                    feedback: "Choosing candidates based on comfort levels can lead to biases. Decisions should be made on merit and fit for the role.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 5,
            title: "Employee Resource Groups",
            description: "Your company is setting up an LGBTIAQ+ Employee Resource Group. Some employees express discomfort, stating they don't see the need for \"special groups.\"",
            explainer: "Employee Resource Groups are voluntary, employee-led groups that foster a diverse, inclusive workplace aligned with organisational goals. They promote inclusion, raise awareness about LGBTQ+ issues, and advocate for equitable policies.",
            question: "What do you do?",
            options: [
                {
                    text: "Explain the importance of safe spaces and community support.",
                    feedback: "Great response! ERGs provide a sense of belonging and support, improving workplace culture and productivity.",
                    inclusionPoints: 2,
                    diversityPoints: 0
                },
                {
                    text: "Cancel the idea to avoid controversy.",
                    feedback: "Avoiding initiatives due to discomfort undermines inclusion. It's important to educate and sensitise employees on the benefits of diversity.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Implement the ERG without addressing the concerns.",
                    feedback: "While creating ERGs is positive, addressing concerns with empathy helps build acceptance and understanding.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 6,
            title: "Reporting Harassment Without Gender-Inclusive POSH Policy",
            description: "Sundar, an employee who identifies as non-binary, reports harassment at work. You realise that your company's POSH (Prevention of Sexual Harassment) policy only addresses gender harassment for women, not gender minorities.",
            explainer: "In India, anti-discrimination policies should cover all gender identities and sexual orientations to ensure a safe and respectful workplace. The POSH Act can be updated to include protections for LGBTIAQ+ employees and also be gender inclusive to include women, men, gender non-binary persons.",
            question: "What do you do?",
            options: [
                {
                    text: "Assure Sundar of your support and investigate the complaint under existing POSH, even if it's not gender-inclusive.",
                    feedback: "This is a good first step, but it's a temporary solution. POSH policies need to be gender-inclusive to protect all employees, regardless of identity.",
                    inclusionPoints: 2,
                    diversityPoints: 0
                },
                {
                    text: "Tell Sundar that the policy doesn't cover non-binary identities but you will speak to the perpetrator informally.",
                    feedback: "This undermines the seriousness of the issue and fails to protect Sundar. Gender-inclusive policies are crucial for formal resolution.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Immediately initiate an update to the POSH policy to be gender-inclusive and ensure Sundar feels safe at work.",
                    feedback: "Excellent choice! This approach addresses the immediate issue while also taking a long-term step towards inclusion.",
                    inclusionPoints: 1,
                    diversityPoints: 1
                }
            ]
        },
        {
            id: 7,
            title: "Chosen Name vs. Dead Name",
            description: "Samaira, who recently transitioned, requests to use her chosen name in all official records. However, some colleagues continue using her dead name, either out of habit or ignorance.",
            explainer: "Transition in gender is the process of aligning one's gender identity with their outward appearance, behaviour, and/or physical body. A dead name is a person's birth name that they no longer use after transitioning to their true identity. A chosen name is the name someone selects that aligns with their gender identity, replacing their birth or dead name.",
            question: "What do you do?",
            options: [
                {
                    text: "Send out a general email reminding everyone to use correct names without specifically mentioning Samaira.",
                    feedback: "A good start, but this might not effectively address the issue. It's important to sensitise and educate employees on the importance of respecting chosen names.",
                    inclusionPoints: 2,
                    diversityPoints: 0
                },
                {
                    text: "Speak to the colleagues privately, explaining why using Samaira's chosen name is important for respect and inclusion.",
                    feedback: "Perfect! Educating and sensitising individuals directly promotes understanding and respect for identity.",
                    inclusionPoints: 1,
                    diversityPoints: 1
                },
                {
                    text: "Tell Samaira that it will take time for people to adjust, and she should be patient.",
                    feedback: "This minimises Samaira's experience and places the burden on her. It's the responsibility of the workplace to enforce respectful practices.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 8,
            title: "Stereotyping Transgender Women as Aggressive",
            description: "Chitra, a transgender woman, is described as \"too assertive\" in her performance review, while similar behaviour is praised in her male colleagues.",
            explainer: "Stereotyping transgender women as aggressive stems from societal biases. Performance feedback should be objective and free of gender stereotypes.",
            question: "What do you do?",
            options: [
                {
                    text: "Ask the reviewers to reassess the feedback, highlighting potential biases.",
                    feedback: "Great choice! This encourages reflection on biases and promotes fair assessments.",
                    inclusionPoints: 2,
                    diversityPoints: 0
                },
                {
                    text: "Tell Chitra to adapt her communication style to be more acceptable to the team.",
                    feedback: "This reinforces stereotypes and places the responsibility on Chitra instead of addressing biases.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Ignore the feedback, assuming it's just office politics.",
                    feedback: "Ignoring the issue allows biases to persist, impacting Chitra's career growth and workplace experience.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 9,
            title: "Lack of LGBTIAQ+ Policy Due to Low Representation",
            description: "Your company doesn't have an LGBTIAQ+ inclusion policy, arguing that only two employees identify as part of the community.",
            question: "What do you do?",
            options: [
                {
                    text: "Advocate for an inclusive policy, explaining that representation should not determine the need for protection and inclusion.",
                    feedback: "Excellent! Policies should be proactive and inclusive, ensuring safety and respect for all employees.",
                    inclusionPoints: 0,
                    diversityPoints: 2
                },
                {
                    text: "Agree that the policy isn't necessary, given the low numbers.",
                    feedback: "This approach ignores the importance of creating an inclusive workplace and discourages future employees from feeling safe to come out.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Inform the two employees privately that they can approach you if they face issues.",
                    feedback: "This is supportive but insufficient. Formal policies provide institutional protection and establish clear guidelines.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                }
            ]
        },
        {
            id: 10,
            title: "Sensitisation on Engaging with Local Communities",
            description: "Your company wants to sensitise employees on interacting with local LGBTIAQ+ communities like Hijras and Kothis.",
            explainer: "Sensitisation involves understanding cultural contexts and challenging stereotypes. Authentic engagement promotes true inclusion.",
            question: "What do you do?",
            options: [
                {
                    text: "Organise a workshop led by community members, ensuring an authentic perspective and respectful engagement.",
                    feedback: "Perfect! Hearing directly from community members promotes empathy and understanding.",
                    inclusionPoints: 0,
                    diversityPoints: 2
                },
                {
                    text: "Circulate an email with guidelines on how to behave around Hijras and Kothis.",
                    feedback: "This risks stereotyping and may come across as condescending. Sensitisation requires interaction and dialogue, not just instructions.",
                    inclusionPoints: -2,
                    diversityPoints: 0
                },
                {
                    text: "Skip the sensitisation as most employees don't interact with these communities daily.",
                    feedback: "This approach ignores the importance of building an inclusive mindset, regardless of frequency of interaction.",
                    inclusionPoints: -2,
                    diversityPoints: 0
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
            const newInclusionPoints = inclusionPoints + option.inclusionPoints;
            const newDiversityPoints = diversityPoints + option.diversityPoints;

            // Update points based on the selected option
            setInclusionPoints(newInclusionPoints);
            setDiversityPoints(newDiversityPoints);

            // Store the response for review later
            setScenarioResponses(prev => [ ...prev, {
                scenarioId: scenarios[ currentScenario ].id,
                title: scenarios[ currentScenario ].title,
                selectedOption: scenarios[ currentScenario ].options[ selectedAnswer ].text,
                feedback: scenarios[ currentScenario ].options[ selectedAnswer ].feedback,
                inclusionDelta: option.inclusionPoints,
                diversityDelta: option.diversityPoints
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
                const currentInclusion = inclusionPointsRef.current;
                const currentDiversity = diversityPointsRef.current;

                // Calculate equity points
                let finalEquityPoints = 0;
                const sum = currentInclusion + currentDiversity;
                if (sum >= 20) {
                    finalEquityPoints = 2 + Math.floor(Math.max(0, (sum - 20) / 10));
                }

                // Log the final calculations for debugging
                console.log("Final calculation:");
                console.log(`Inclusion: ${currentInclusion}`);
                console.log(`Diversity: ${currentDiversity}`);
                console.log(`Equity: ${finalEquityPoints}`);
                console.log(`Total: ${currentInclusion + currentDiversity + finalEquityPoints}`);

                // Update equity points and change game state
                setEquityPoints(finalEquityPoints);
                setGameState('results');
            }
        }
    };

    // FIXED getResult function with clearer condition checks
    const getResult = () => {
        // Calculate the total points
        const total = inclusionPoints + diversityPoints + equityPoints;

        // Log for debugging
        console.log(`getResult calculating total: ${total}`);
        console.log(`Inclusion: ${inclusionPoints}, Diversity: ${diversityPoints}, Equity: ${equityPoints}`);

        // Check against thresholds in descending order
        if (total > 43) {
            // got highest score of 40
            return {
                level: "DE&I Champion",
                message: "Congratulations! You have a deep understanding of inclusion and diversity."
            };
        }
        else if (total >= 33) {
            // got score between 30 and 39
            return {
                level: "DE&I Leader",
                message: "You're doing well! Keep learning to become a DE&I Champion."
            };
        }
        else if (total >= 22) {
            // got score between 20 and 29
            return {
                level: "DE&I Learner",
                message: "You have a good start but need to polish your DE&I skills. Keep learning and growing."
            };
        }
        else {
            return {
                level: "DE&I Beginner",
                message: "It's time to play again and learn more about inclusive practices."
            };
        }
    };

    const resetGame = () => {
        setGameState('intro');
        setCurrentScenario(0);
        setInclusionPoints(10);
        setDiversityPoints(10);
        setEquityPoints(0);
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
                        <h1>Inclusion & Diversity Game</h1>
                        <p>Become an LGBTIAQ+ inclusive HR Personnel</p>
                    </div>

                    <div className="card-body">
                        <img
                            src="/inclusion.jpg"
                            alt="Inclusion & Diversity Quiz Introduction"
                            style={{ width: "100%", display: "block", marginBottom: "1.5rem", borderRadius: "8px" }}
                        />
                        <h2>Welcome!</h2>
                        <p>You are an HR professional at a leading corporate organisation in India. Your mission is to ensure an inclusive and engaging workplace for all employees while also attracting diverse talent.</p>

                        <div className="info-box">
                            <h3>Instructions</h3>
                            <ul>
                                <li><span className="highlight-purple">Inclusion Points</span> measure how welcoming and respectful you are in your interactions.</li>
                                <li><span className="highlight-blue">Diversity Points</span> measure your understanding and responsiveness to the needs of diverse employees.</li>
                                <li><span className="highlight-green">Equity Points</span> are awarded when you achieve a balanced score in both Inclusion and Diversity.</li>
                                <li>You start with 10 Inclusion and Diversity Points each.</li>
                            </ul>
                        </div>

                        <div className="info-box">
                            <h3>Scoring</h3>
                            <ul>
                                <li>Maximum points per answer: +2 points</li>
                                <li>Minimum points per answer: -2 points</li>
                            </ul>
                        </div>

                        <button onClick={startGame} className="primary-button">
                            Start Game <ArrowRight className="icon" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (gameState === 'results') {
        const result = getResult();
        const totalPoints = inclusionPoints + diversityPoints + equityPoints;

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
                            <p>{result.message}</p>
                            <div className="score-container">
                                <div className="score-item">
                                    <div className="score-value inclusion-color">{inclusionPoints}</div>
                                    <div className="score-label">Inclusion</div>
                                </div>
                                <div className="score-item">
                                    <div className="score-value diversity-color">{diversityPoints}</div>
                                    <div className="score-label">Diversity</div>
                                </div>
                                <div className="score-item">
                                    <div className="score-value equity-color">{equityPoints.toFixed(1)}</div>
                                    <div className="score-label">Equity</div>
                                </div>
                                <div className="score-item">
                                    <div className="score-value">{totalPoints.toFixed(1)}</div>
                                    <div className="score-label">Total</div>
                                </div>
                            </div>
                        </div>

                        <h3>Review Your Responses</h3>
                        <div className="responses-container">
                            {scenarioResponses.map((response, index) => (
                                <div key={index} className="response-item">
                                    <h4>{response.title}</h4>
                                    <p className="response-text">Your response: {response.selectedOption}</p>
                                    <p className="feedback-text">{response.feedback}</p>
                                    <div className="points-container">
                                        <div className={response.inclusionDelta > 0 ? "positive-points" : response.inclusionDelta < 0 ? "negative-points" : ""}>
                                            Inclusion: {response.inclusionDelta > 0 ? '+' : ''}{response.inclusionDelta}
                                        </div>
                                        <div className={response.diversityDelta > 0 ? "positive-points" : response.diversityDelta < 0 ? "negative-points" : ""}>
                                            Diversity: {response.diversityDelta > 0 ? '+' : ''}{response.diversityDelta}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={resetGame} className="primary-button">
                            Play Again <RefreshCcw className="icon" size={18} />
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
                    <h1>Scenario {currentScenario + 1}: {scenarios[ currentScenario ].title}</h1>
                    <div className="points-display">
                        <div className="point-badge inclusion-badge">
                            Inclusion: {inclusionPoints}
                        </div>
                        <div className="point-badge diversity-badge">
                            Diversity: {diversityPoints}
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

                    {scenarios[ currentScenario ].explainer && (
                        <div className="explainer-box">
                            <h3>DEI Explainer</h3>
                            <p>{scenarios[ currentScenario ].explainer}</p>
                        </div>
                    )}

                    <h3 className="scenario-question">{scenarios[ currentScenario ].question}</h3>

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
                            </div>
                        ))}
                    </div>

                    {answerSubmitted && selectedAnswer !== null && (
                        <div className={`feedback-box ${scenarios[ currentScenario ].options[ selectedAnswer ].inclusionPoints +
                            scenarios[ currentScenario ].options[ selectedAnswer ].diversityPoints > 0
                            ? 'positive-feedback'
                            : 'negative-feedback'
                            }`}>
                            <p>{scenarios[ currentScenario ].options[ selectedAnswer ].feedback}</p>
                            <div className="feedback-points">
                                <div className={
                                    scenarios[ currentScenario ].options[ selectedAnswer ].inclusionPoints > 0
                                        ? "positive-points"
                                        : scenarios[ currentScenario ].options[ selectedAnswer ].inclusionPoints < 0
                                            ? "negative-points"
                                            : ""
                                }>
                                    Inclusion: {scenarios[ currentScenario ].options[ selectedAnswer ].inclusionPoints > 0 ? '+' : ''}
                                    {scenarios[ currentScenario ].options[ selectedAnswer ].inclusionPoints}
                                </div>
                                <div className={
                                    scenarios[ currentScenario ].options[ selectedAnswer ].diversityPoints > 0
                                        ? "positive-points"
                                        : scenarios[ currentScenario ].options[ selectedAnswer ].diversityPoints < 0
                                            ? "negative-points"
                                            : ""
                                }>
                                    Diversity: {scenarios[ currentScenario ].options[ selectedAnswer ].diversityPoints > 0 ? '+' : ''}
                                    {scenarios[ currentScenario ].options[ selectedAnswer ].diversityPoints}
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
                                ? "Next Scenario"
                                : "See Results"
                            : "Submit Answer"}
                        <ArrowRight className="icon" size={18} />
                    </button>

                    <div className="scenario-counter">
                        Scenario {currentScenario + 1} of {scenarios.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InclusionGame;