import { useState } from 'react';

const chapters = [
  {
    title: "Chapter 1: The First Paycheck",
    age: 22,
    story: "Alex just landed their first job as a software engineer in Bangalore, earning ₹45,000 per month. After taxes and deductions, their net income is ₹35,000. They're excited but overwhelmed - there's so much they want to do with their money!<br><br>Their college friends are constantly going out for movies, fancy dinners, and weekend trips. Alex loves spending time with them, but also knows they should be responsible with money.",
    dilemma: "🤔 Alex's Dilemma: How should Alex approach budgeting their first salary?",
    choices: [
      {
        title: "Save ₹20,000, spend ₹15,000",
        description: "Maximize savings from the start, even if it means missing out on social activities.",
        points: 10,
        feedback: "Good discipline, but don't forget to enjoy life a little! The 50/30/20 rule might be more balanced."
      },
      {
        title: "Spend ₹25,000, save ₹10,000",
        description: "They're young and should enjoy life while they can.",
        points: -20,
        feedback: "Enjoying life is important, but this spending rate could lead to financial trouble later."
      },
      {
        title: "Follow the 50/30/20 rule",
        description: "₹17,500 for needs, ₹10,500 for wants, ₹7,000 for savings. Balanced approach.",
        points: 30,
        feedback: "Excellent choice! The 50/30/20 rule is a proven method for balanced financial management."
      }
    ]
  },
  {
    title: "Chapter 2: The Unexpected Hospital Bill",
    age: 22,
    story: "Six months later, Alex has been following their budget and saved ₹42,000. Then their father suddenly falls ill and needs immediate surgery. The family needs ₹30,000 urgently.",
    dilemma: "🚨 Alex's Dilemma: Where should Alex have kept their emergency fund?",
    choices: [
      {
        title: "High-yield savings account",
        description: "For immediate access when emergencies strike.",
        points: 30,
        feedback: "Perfect! Emergency funds should always be easily accessible when you need them most."
      },
      {
        title: "3-year Fixed Deposit",
        description: "For maximum returns - can break it early if needed.",
        points: -20,
        feedback: "Breaking FDs early often comes with penalties. Emergency funds need immediate access."
      },
      {
        title: "Split between savings and FD",
        description: "₹20,000 in savings, ₹22,000 in short-term FD for better returns.",
        points: 10,
        feedback: "A reasonable compromise, but full liquidity is generally better for emergency funds."
      }
    ]
  },
  {
    title: "Chapter 3: The Credit Card Trap",
    age: 23,
    story: "A year later, Alex owes ₹25,000 on their credit card (36% annual interest). Their laptop died and they need a new one for work. They can either buy a basic laptop for ₹30,000 cash or get a premium one for ₹60,000 with a 12% consumer loan.",
    dilemma: "💳 Alex's Dilemma: What should Alex prioritize?",
    choices: [
      {
        title: "Buy basic laptop on EMI",
        description: "12% interest to preserve cash while paying minimum on credit card.",
        points: 10,
        feedback: "This preserves cash but credit card debt at 36% should be the priority."
      },
      {
        title: "Buy basic laptop with cash, pay off credit card",
        description: "Aggressively pay off the high-interest credit card debt first.",
        points: 30,
        feedback: "Excellent! Always prioritize paying off high-interest debt first."
      },
      {
        title: "Take loan for premium laptop",
        description: "They can manage both EMIs and deserve quality equipment.",
        points: -20,
        feedback: "This adds more debt when you already have high-interest credit card debt to clear."
      }
    ]
  },
  {
    title: "Chapter 4: Building Wealth",
    age: 26,
    story: "Now 26, Alex has been promoted and bought a house with a home loan. They also own a car purchased with an auto loan. Their friend Raj argues that both are assets since Alex uses them daily.",
    dilemma: "🏠 Alex's Dilemma: How should Alex classify these in their financial records?",
    choices: [
      {
        title: "Only house is an asset",
        description: "House appreciates in value; the car is just an expense.",
        points: 10,
        feedback: "You're on the right track, but cars are still assets even if they depreciate."
      },
      {
        title: "House is asset, car is depreciating asset",
        description: "Both are assets with different appreciation patterns, loans are liabilities.",
        points: 30,
        feedback: "Perfect understanding! Assets and liabilities must be clearly distinguished."
      },
      {
        title: "Both are assets, loans don't matter",
        description: "They provide value and are secured loans.",
        points: -20,
        feedback: "Loans are definitely liabilities that impact your net worth calculation."
      }
    ]
  },
  {
    title: "Chapter 5: Planning for the Future",
    age: 28,
    story: "At 28, Alex is comparing retirement savings options: PPF (15-year lock-in, tax benefits) versus Recurring Deposit (flexible, can break anytime).",
    dilemma: "🎯 Alex's Dilemma: For long-term retirement planning, which approach is better?",
    choices: [
      {
        title: "Choose PPF",
        description: "Tax benefits and disciplined long-term saving despite the lock-in period.",
        points: 30,
        feedback: "Excellent choice! PPF offers great tax benefits and enforces disciplined saving."
      },
      {
        title: "Go with RD",
        description: "Flexibility is important - might need money before retirement.",
        points: -20,
        feedback: "RDs don't offer tax benefits and the flexibility might tempt you to withdraw early."
      },
      {
        title: "Split between both",
        description: "Some flexibility with RD, some tax benefits with PPF.",
        points: 10,
        feedback: "A reasonable approach, but PPF's tax benefits make it more attractive for retirement."
      }
    ]
  },
  {
    title: "Chapter 6: The Credit Score Reality Check",
    age: 29,
    story: "Alex has a ₹50,000 credit limit and regularly spends ₹35,000 monthly, paying the full amount each time. They notice their CIBIL score has dropped slightly.",
    dilemma: "📊 Alex's Dilemma: How should Alex manage their credit card usage?",
    choices: [
      {
        title: "Use multiple credit cards",
        description: "Distribute spending across cards to lower individual utilization.",
        points: 10,
        feedback: "This can help with utilization, but managing multiple cards requires discipline."
      },
      {
        title: "Continue current pattern",
        description: "Paying in full is what matters, not the amount spent.",
        points: -20,
        feedback: "High utilization (70%) negatively impacts credit scores even if paid in full."
      },
      {
        title: "Keep spending below 30% utilization",
        description: "Monthly spending below ₹15,000 to maintain healthy credit score.",
        points: 30,
        feedback: "Perfect! 30% utilization is the golden rule for maintaining good credit scores."
      }
    ]
  },
  {
    title: "Chapter 7: The Investment Journey",
    age: 30,
    story: "At 30, Alex wants to invest ₹10,000 monthly in the stock market but lacks time for research. Options include: Index funds, individual stock picking, or actively managed mutual funds.",
    dilemma: "📈 Alex's Dilemma: Given time constraints and need for diversification, what's the best approach?",
    choices: [
      {
        title: "Pick individual stocks",
        description: "Based on tips from successful friends and online forums.",
        points: -20,
        feedback: "Stock picking based on tips is risky and time-consuming without proper research."
      },
      {
        title: "Actively managed mutual funds",
        description: "Professional stock selection that aims to beat the market.",
        points: 10,
        feedback: "Good option, but higher fees and not all funds consistently beat the market."
      },
      {
        title: "Low-cost index funds",
        description: "Broad market exposure with minimal research needed.",
        points: 30,
        feedback: "Excellent! Index funds offer diversification, low costs, and require minimal time."
      }
    ]
  },
  {
    title: "Chapter 8: Health Insurance Wisdom",
    age: 31,
    story: "Alex has ₹5 lakh company health insurance but wants additional coverage after their father's expensive treatment. Options: Super Top-Up policy, separate comprehensive policy, or increase company coverage.",
    dilemma: "🏥 Alex's Dilemma: What's the most cost-effective way to increase health coverage?",
    choices: [
      {
        title: "Increase company coverage",
        description: "Negotiate with company to increase base coverage and pay additional premium.",
        points: 10,
        feedback: "Good option if available, but you lose coverage when changing jobs."
      },
      {
        title: "Separate comprehensive policy",
        description: "Complete coverage from the first rupee independently.",
        points: -20,
        feedback: "This is expensive as it duplicates existing coverage unnecessarily."
      },
      {
        title: "Super Top-Up policy",
        description: "Activates after the base policy limit is exhausted.",
        points: 30,
        feedback: "Perfect! Super Top-Up policies are cost-effective and provide high coverage."
      }
    ]
  },
  {
    title: "Chapter 9: Workplace Benefits Strategy",
    age: 32,
    story: "At 32, Alex must choose NPS asset allocation. With 30+ years to retirement, options are: 75% equity (volatile but high growth potential), 50% equity (balanced), or 25% equity (conservative).",
    dilemma: "💼 Alex's Dilemma: Given the long investment horizon, what allocation makes sense?",
    choices: [
      {
        title: "75% equity allocation",
        description: "Maximize long-term growth potential despite short-term volatility.",
        points: 30,
        feedback: "Excellent! With 30+ years to retirement, you can ride out market volatility."
      },
      {
        title: "25% equity for safety",
        description: "Market crashes could destroy retirement savings.",
        points: -20,
        feedback: "Too conservative for your age. Inflation will erode conservative returns over 30 years."
      },
      {
        title: "50% equity for balance",
        description: "Balanced growth with moderate risk protection.",
        points: 10,
        feedback: "Reasonable approach, but you could afford more equity risk at your age."
      }
    ]
  },
  {
    title: "Chapter 10: Legacy Planning",
    age: 35,
    story: "At 35, Alex has accumulated significant wealth and gotten married. They have nominations on all accounts. Their spouse thinks this is sufficient for estate planning.",
    dilemma: "📋 Alex's Dilemma: Is nomination enough for comprehensive estate planning?",
    choices: [
      {
        title: "Create a basic Will",
        description: "Cover major assets while maintaining nominations for financial accounts.",
        points: 10,
        feedback: "Good start, but comprehensive planning covers all assets and scenarios."
      },
      {
        title: "Comprehensive Will + nominations",
        description: "Ensure all assets are covered and wishes are clear.",
        points: 30,
        feedback: "Perfect! Comprehensive estate planning protects your family's future."
      },
      {
        title: "Rely only on nominations",
        description: "Simpler and avoids legal complications of Will execution.",
        points: -20,
        feedback: "Nominations don't cover all assets and may not reflect your complete wishes."
      }
    ]
  }
];

export default function FinancialJourneyGame() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isPositiveFeedback, setIsPositiveFeedback] = useState(true);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  const currentChapterData = chapters[currentChapter];

  const getFinancialStatus = () => {
    if (totalScore >= 250) return "Financial Guru";
    else if (totalScore >= 200) return "Money Smart";
    else if (totalScore >= 150) return "Learning Curve";
    else return "Fresh Start";
  };

  const selectChoice = (choiceIndex) => {
    if (selectedChoice !== null) return;
    
    setSelectedChoice(choiceIndex);
    const choice = currentChapterData.choices[choiceIndex];
    
    setTotalScore(prev => prev + choice.points);
    setFeedbackText(choice.feedback);
    setIsPositiveFeedback(choice.points > 0);
    setShowFeedback(true);
  };

  const nextChapter = () => {
    if (selectedChoice === null) return;
    
    if (currentChapter >= chapters.length - 1) {
      setShowFinalScreen(true);
    } else {
      setCurrentChapter(prev => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    }
  };

  const restartGame = () => {
    setCurrentChapter(0);
    setTotalScore(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setShowFinalScreen(false);
  };

  const exploreLocation = (location) => {
    const messages = {
      office: "💼 At the office, Alex learns about PF contributions and salary planning!",
      bank: "🏦 The bank offers investment advice and savings account options!",
      home: "🏠 Family discussions about budgeting and emergency planning!",
      mall: "🛍️ Tempting purchases everywhere! Stay within budget!"
    };
    
    alert(messages[location]);
  };

  const showCharacterInfo = () => {
    alert("👤 Hi! I'm Alex. Help me make smart financial decisions on this journey!");
  };

  const getFinalInterpretation = () => {
    if (totalScore >= 250) return "🏆 Financial Guru - Excellent financial decision-making skills!";
    else if (totalScore >= 200) return "💰 Money Smart - Good financial literacy with room for improvement!";
    else if (totalScore >= 150) return "📚 Learning Curve - Basic understanding, needs more financial education!";
    else return "🌱 Fresh Start - Significant financial education needed to avoid costly mistakes!";
  };

  const progress = ((currentChapter + 1) / chapters.length) * 100;

  const styles = {
    gameContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    gameHUD: {
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      padding: '20px',
      borderRadius: '30px',
      marginBottom: '20px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.2)'
    },
    hudContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    lifeStats: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    stat: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: '#f8f9fa',
      padding: '12px 20px',
      borderRadius: '25px',
      fontWeight: 'bold',
      border: '2px solid #e9ecef'
    },
    chapterInfo: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '25px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    progressBar: {
      background: '#e0e0e0',
      height: '8px',
      borderRadius: '10px',
      marginTop: '10px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #56ab2f, #a8e6cf)',
      borderRadius: '10px',
      transition: 'width 0.8s ease',
      width: `${progress}%`
    },
    gameWorld: {
      background: 'white',
      borderRadius: '30px',
      overflow: 'hidden',
      boxShadow: '0 15px 50px rgba(0,0,0,0.2)',
      minHeight: '600px'
    },
    environment: {
      height: '250px',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 70%, #90EE90 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '20px'
    },
    cityScene: {
      display: 'flex',
      gap: '30px',
      alignItems: 'flex-end'
    },
    building: {
      width: '70px',
      height: '100px',
      borderRadius: '8px 8px 0 0',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      color: 'white',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    buildingHover: {
      transform: 'scale(1.1) translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
    },
    office: {
      background: 'linear-gradient(45deg, #4299e1, #3182ce)'
    },
    bank: {
      background: 'linear-gradient(45deg, #48bb78, #38a169)'
    },
    home: {
      background: 'linear-gradient(45deg, #ed8936, #dd6b20)'
    },
    mall: {
      background: 'linear-gradient(45deg, #9f7aea, #805ad5)'
    },
    buildingLabel: {
      position: 'absolute',
      bottom: '-25px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '5px 12px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap'
    },
    character: {
      position: 'absolute',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '80px',
      background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px',
      border: '4px solid white',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      animation: 'gentle-bounce 3s ease-in-out infinite'
    },
    storyPanel: {
      padding: '40px',
      background: 'white'
    },
    storyHeader: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    storyTitle: {
      fontSize: '28px',
      color: '#667eea',
      marginBottom: '15px',
      fontWeight: 'bold'
    },
    storyContent: {
      background: '#f8f9fa',
      padding: '25px',
      borderRadius: '15px',
      margin: '25px 0',
      borderLeft: '5px solid #667eea',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    dilemmaBox: {
      background: 'linear-gradient(135deg, #ffeaa7, #fab1a0)',
      padding: '25px',
      borderRadius: '15px',
      margin: '25px 0',
      textAlign: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    dilemmaTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px'
    },
    choicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      margin: '30px 0'
    },
    choiceCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '25px',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      border: '3px solid transparent'
    },
    choiceCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
      borderColor: '#ffd700'
    },
    choiceCardSelected: {
      background: 'linear-gradient(135deg, #28a745, #20c997)',
      transform: 'scale(1.02)'
    },
    choiceHeader: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: '15px'
    },
    choiceLabel: {
      background: 'rgba(255,255,255,0.3)',
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    choiceTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    choiceDescription: {
      fontSize: '15px',
      opacity: '0.95',
      lineHeight: '1.4'
    },
    feedbackPanel: {
      background: '#e8f5e8',
      border: '2px solid #28a745',
      padding: '20px',
      borderRadius: '15px',
      margin: '20px 0'
    },
    feedbackPanelNegative: {
      background: '#ffe6e6',
      border: '2px solid #dc3545'
    },
    gameControls: {
      textAlign: 'center',
      padding: '30px',
      background: '#f8f9fa',
      borderTop: '3px solid #667eea'
    },
    btn: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '0 10px'
    },
    btnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
    },
    btnDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      transform: 'none'
    },
    btnRestart: {
      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
    },
    finalScreen: {
      textAlign: 'center',
      padding: '50px',
      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
      borderRadius: '20px',
      margin: '20px',
      boxShadow: '0 15px 50px rgba(255, 215, 0, 0.3)'
    },
    finalTitle: {
      fontSize: '36px',
      marginBottom: '20px',
      color: '#333'
    },
    finalScore: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '15px 0'
    }
  };

  if (showFinalScreen) {
    return (
      <div style={styles.gameContainer}>
        <div style={styles.container}>
          <div style={styles.finalScreen}>
            <h1 style={styles.finalTitle}>🎉 Journey Complete!</h1>
            <div style={styles.finalScore}>Final Score: {totalScore} points</div>
            <div style={{fontSize: '18px', color: '#666', marginBottom: '30px'}}>{getFinalInterpretation()}</div>
            <button 
              onClick={restartGame}
              style={{...styles.btn, marginTop: '30px'}}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.gameContainer}>
      <div style={styles.container}>
        {/* Game HUD */}
        <div style={styles.gameHUD}>
          <div style={styles.hudContent}>
            <div style={styles.lifeStats}>
              <div style={styles.stat}>
                <span>💰</span>
                <span>₹35,000</span>
              </div>
              <div style={styles.stat}>
                <span>📊</span>
                <span>Score: {totalScore}</span>
              </div>
              <div style={styles.stat}>
                <span>🎯</span>
                <span>{getFinancialStatus()}</span>
              </div>
            </div>
            <div style={styles.chapterInfo}>
              <div>Chapter {currentChapter + 1} of {chapters.length}</div>
              <div>Age: {currentChapterData.age}</div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Game World */}
        <div style={styles.gameWorld}>
          {/* City Environment */}
          <div style={styles.environment}>
            <div style={styles.cityScene}>
              <div 
                style={{...styles.building, ...styles.office}}
                onClick={() => exploreLocation('office')}
              >
                💼
                <div style={styles.buildingLabel}>Office</div>
              </div>
              <div 
                style={{...styles.building, ...styles.bank}}
                onClick={() => exploreLocation('bank')}
              >
                🏦
                <div style={styles.buildingLabel}>Bank</div>
              </div>
              <div 
                style={{...styles.building, ...styles.home}}
                onClick={() => exploreLocation('home')}
              >
                🏠
                <div style={styles.buildingLabel}>Home</div>
              </div>
              <div 
                style={{...styles.building, ...styles.mall}}
                onClick={() => exploreLocation('mall')}
              >
                🛍️
                <div style={styles.buildingLabel}>Mall</div>
              </div>
            </div>
            
            {/* Character Avatar */}
            <div 
              style={styles.character}
              onClick={showCharacterInfo}
            >
              👤
            </div>
          </div>

          {/* Story Panel */}
          <div style={styles.storyPanel}>
            <div style={styles.storyHeader}>
              <h1 style={styles.storyTitle}>{currentChapterData.title}</h1>
            </div>

            <div 
              style={styles.storyContent}
              dangerouslySetInnerHTML={{__html: currentChapterData.story}}
            />

            <div style={styles.dilemmaBox}>
              <div style={styles.dilemmaTitle}>
                {currentChapterData.dilemma}
              </div>
            </div>

            {/* Choice Cards */}
            <div style={styles.choicesGrid}>
              {currentChapterData.choices.map((choice, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.choiceCard,
                    ...(selectedChoice === index ? styles.choiceCardSelected : {})
                  }}
                  onClick={() => selectChoice(index)}
                >
                  <div style={styles.choiceHeader}>
                    <div style={styles.choiceLabel}>
                      Choice {String.fromCharCode(65 + index)}
                    </div>
                  </div>
                  <div style={styles.choiceTitle}>{choice.title}</div>
                  <div style={styles.choiceDescription}>{choice.description}</div>
                </div>
              ))}
            </div>

            {/* Feedback Panel */}
            {showFeedback && (
              <div style={{
                ...styles.feedbackPanel,
                ...(isPositiveFeedback ? {} : styles.feedbackPanelNegative)
              }}>
                <h3 style={{marginBottom: '10px', fontWeight: 'bold'}}>📝 Feedback</h3>
                <p>{feedbackText}</p>
              </div>
            )}
          </div>

          {/* Game Controls */}
          <div style={styles.gameControls}>
            <button
              onClick={nextChapter}
              disabled={selectedChoice === null}
              style={{
                ...styles.btn,
                ...(selectedChoice === null ? styles.btnDisabled : {})
              }}
            >
              Continue Journey →
            </button>
            <button
              onClick={restartGame}
              style={{...styles.btn, ...styles.btnRestart}}
            >
              🔄 Restart
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}