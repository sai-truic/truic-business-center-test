import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Form, FormField } from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Accordion } from './ui/accordion';
import { Progress } from './ui/progress';
import { CheckCircle2 } from 'lucide-react';

const quizData = [
  {
    question: "What best describes your current financial reality?",
    options: [
      "I have a large pool of savings. I've been saving for a long time to be able to invest in my future.",
      "I'm comfortable with my amount of savings, but I'd probably source extra startup funding to really get my idea off the ground.",
      "I have some savings set aside and I am building my nest egg, but I prefer to keep that financial padding for family and unforeseen problems.",
      "I don't have savings - but I won't let that stop me!"
    ]
  },
  {
    question: "How would you describe your position within your family?",
    options: [
      "I'm the leader of the pack. My family depends on me for their daily necessities, and I'm here to take care of them.",
      "I take care of myself.",
      "My family, friends, and I are always there for each other. I know they'll be there for me to get through rough times, but we're very comfortable.",
      "I work so I can chip in to my family's resources. We all have to work together to make sure we have what we need."
    ]
  },
  {
    question: "How have friends and family reacted to your plans?",
    options: [
      "I don't concern my family or social group with business.",
      "My friends and family are really excited! They want to see me succeed and they love my idea.",
      "My friends and family think I'm better off doing something else, and don't see my ideas the same way I do. I'll need to prove them wrong.",
      "I've told a select few people who I think could make this idea happen if we worked together. They're interested and want to do more."
    ]
  },
  {
    question: "How are you managing your current responsibilities?",
    options: [
      "I don't have any major responsibilities or regular commitments.",
      "I have a lot of things I am committed to doing regularly. I build my schedule tightly around those responsibilities and commitments. The majority of my waking hours are spent on those tasks.",
      "I have a few responsibilities or commitments, but it's not unmanageable. I'm able to make some time for myself and my hobbies.",
      "If I have any responsibilities, it's usually something I can delegate to someone else or isn't anything urgent. Otherwise, my time is my own."
    ]
  },
  {
    question: "How much time will you commit in order to initially launch your business idea?",
    options: [
      "I will work as much as I can in my spare time, for however long it takes.",
      "I will work literally every waking moment if I have to.",
      "I will work all day during the workweek, and will take weekends off.",
      "My goal is to be free from long hours. I will put in work up-front, but I want my business to run on its own."
    ]
  },
  {
    question: "What best describes your career status?",
    options: [
      "I can't stand my job or the industry I'm in. I want to pursue something new.",
      "I'm in an industry related to my passions and I've learned a lot, but I'm ready to move on.",
      "I've worked other jobs and have been hunting for a job in the industry I'm passionate about, but I haven't yet worked somewhere that has taught me how my preferred business operates. I'll have to create my own job opening!",
      "I love my job and the industry I'm in. I want to contribute my own voice and ideas to the world, and know I can provide something unique."
    ]
  },
  {
    question: "What best describes your understanding of business practices and your chosen industry?",
    options: [
      "I haven't worked a traditional job. I have learned to navigate relationships and negotiations through my everyday life.",
      "I've learned a lot from my job or hands-on experience in an industry related to my idea. I have a good understanding of those markets, which I'll apply to my business.",
      "I've worked long-term at several businesses. I was with them through their life cycles and saw firsthand how businesses both succeed and fail. That process excites me.",
      "I don't know much about my target industry, but I plan to carve my own path in business and learn as I go."
    ]
  },
  {
    question: "What's your first reaction in a crisis?",
    options: [
      "I think of all the problems this new situation will bring, and how it might undo all the plans I've made.",
      "I stop in my tracks and take as much time as I can to shift my mind from what I was focusing on to this new situation.",
      "I immediately start gathering information in order to put together a plan.",
      "I go with my gut and step into action as fast as possible."
    ]
  },
  {
    question: "Are you a self-promoter?",
    options: [
      "I believe in and love what I do and who I am, so it makes it easier to tell everyone about it! I have no shame in spreading the word about what I'm up to all the time.",
      "I usually hope that other people see what I'm doing and assist in spreading the word.",
      "It takes a lot for me to talk about or post what I'm up to on social media - I'm trying to get better at it, but there's definitely been a learning curve.",
      "Promoting myself feels unnatural to me and is difficult to do. I generally avoid it."
    ]
  },
  {
    question: "What made you decide to be an entrepreneur?",
    options: [
      "I want financial freedom.",
      "I enjoy running things and being a leader.",
      "I want to be free to do what I want when I want, and to have a comfortable lifestyle.",
      "I know my business idea fills a need in the world, and I feel compelled to make it happen no matter what."
    ]
  }
];

const outcomeData = {
  title: "Partnership",
  description: "You would be a great fit for launching your business through a well-rounded partnership. You have a lot of the important ingredients of a successful entrepreneur, but until you have everything it takes you'd be more secure in finding someone who has the qualities you lack. There are several key components we look at in order to be confident in your success. Here's what your answers told us:"
};

const insightsData = [
  {
    title: "Time",
    content: "Running a business takes a large investment of time. Even if you feel that you have some time to spend on your interests, it's likely not enough to devote towards a full-scale business. A business is a big part of your life, and can't function well without proper attention."
  },
  {
    title: "Money",
    content: "It's an unfortunate truth: you need to have money to avoid burnout, an abandoned investment, and a lifetime of scarred credit. You have enough financial security to make a period of negative or unstable income doable."
  },
  {
    title: "Support System",
    content: "If your business were to experience a rough patch - or complete failure - you need to know that there's something to catch you at the end of that fall. For entrepreneurs, having a tight-knit support system of friends and family is what ends up carrying them through. It's also important to avoid putting dependents in a high-risk scenario since they'll suffer in the event of a catastrophe. Even if you don't anticipate big risks in your business, knowing that people are there for you allows you to make bigger leaps than you might do otherwise, which often leads to bigger successes."
  },
  {
    title: "Industry Support",
    content: "It's not enough to just know the basics for the industry you enter - you know the ins, the outs, the pitfalls, and the best practices that make you confident in your success. Working a job (or two) in a position directly related to your business idea is the best way to get rounded knowledge. It's also one of the best ways to save up money to put towards your business!"
  },
  {
    title: "Personality",
    content: "Owning your own business isn't a quick ticket to money and leisure. In fact, entrepreneurship is far, far from that. Take your time to build up your dream, Once it's running, you should act on problems quickly to make it thrive. You need to believe 200% in your idea, which will help instill belief and support in your employees, your partners, and your customers. Having the right mindset will keep you from burning out or losing sight of your goals."
  }
];

const EntrepreneurshipQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCurrentAnswer = () => answers[currentQuestion] || '';

  const renderQuiz = () => (
    <div className="w-full max-w-9xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Question {currentQuestion + 1} of {quizData.length}</span>
          <span className="text-sm font-medium text-gray-700">{Math.round((answers.filter(Boolean).length) / quizData.length * 100)}% Complete</span>
        </div>
        <Progress value={(answers.filter(Boolean).length) / quizData.length * 100} className="h-2" />
      </div>
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-400 to-blue-500 text-white">
          <CardTitle className="text-3xl font-bold text-center">Entrepreneurship Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center space-x-2 mb-4">
            {quizData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < currentQuestion
                    ? 'bg-green-500'
                    : index === currentQuestion
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <Form>
            <FormField>
              <p className="text-xl font-semibold mb-6">{quizData[currentQuestion].question}</p>
              <RadioGroup className="space-y-4" value={getCurrentAnswer()} onValueChange={handleAnswer}>
                {quizData[currentQuestion].options.map((option, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${getCurrentAnswer() === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} hover:bg-gray-50 transition-colors`}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <label htmlFor={`option-${index}`} className="cursor-pointer flex-grow text-lg flex items-center justify-between">
                      <span>{option}</span>
                      {getCurrentAnswer() === option && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormField>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button 
            onClick={goToPreviousQuestion} 
            disabled={currentQuestion === 0}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-6 py-2 rounded-full transition-colors"
          >
            Previous
          </Button>
          <Button 
            onClick={goToNextQuestion} 
            disabled={!answers[currentQuestion]}
            className={`px-6 py-2 rounded-full transition-colors ${
              answers[currentQuestion]
                ? currentQuestion === quizData.length - 1
                  ? 'bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-full transition-colors'
                  : 'bg-blue-300 text-white hover:bg-blue-400 px-6 py-2 rounded-full transition-colors'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-2 rounded-full transition-colors'
            }`}
          >
            {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderResults = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardTitle className="text-3xl font-bold text-center">{outcomeData.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-xl mb-8 text-gray-700 leading-relaxed">{outcomeData.description}</p>
        <Accordion type="single" collapsible className="w-full">
          {insightsData.map((insight, index) => (
            <Accordion.Item key={index} value={`item-${index}`}>
              <Accordion.Trigger className="text-xl font-semibold p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                {insight.title}
              </Accordion.Trigger>
              <Accordion.Content>
                <p className="p-6 text-gray-700 leading-relaxed">{insight.content}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );

  return (
    <div className="entrepreneurship-quiz p-8 bg-gray-100 min-h-screen">
      {showResults ? renderResults() : renderQuiz()}
    </div>
  );
};

export default EntrepreneurshipQuiz;
