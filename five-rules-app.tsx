import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Moon, Eye, Shuffle, Compass, Circle, Download, RotateCcw, Plus, X } from 'lucide-react';

const rules = [
  { id: 1, title: "Confront Your Shadow", icon: Moon, color: "from-slate-600 to-slate-800" },
  { id: 2, title: "Make the Unconscious Conscious", icon: Eye, color: "from-indigo-600 to-indigo-800" },
  { id: 3, title: "Integrate Your Opposites", icon: Shuffle, color: "from-violet-600 to-violet-800" },
  { id: 4, title: "Follow Your Own Pattern", icon: Compass, color: "from-emerald-600 to-emerald-800" },
  { id: 5, title: "Accept the Wholeness of Life", icon: Circle, color: "from-amber-600 to-amber-700" }
];

const presets = {
  rule1: {
    trigger: ["A colleague", "A family member", "My partner", "A friend", "Someone online", "A public figure", "My boss", "A stranger"],
    trait: ["They're selfish", "They're arrogant", "They're too loud", "They're lazy", "They're fake", "They're controlling", "They need constant attention", "They're too emotional", "They never listen", "They think they're better"],
    mirror: ["I do this sometimes too", "I wish I could be more like this", "I used to be like this", "I suppress this in myself", "I'm scared I'm like this", "I judge myself for wanting this"],
    instance: ["At work when stressed", "With family during conflict", "When I feel overlooked", "When I'm tired or overwhelmed", "When I don't get my way", "When I feel threatened"]
  },
  rule2: {
    event: ["A schedule change upset me", "Someone cancelled plans", "I made a small mistake", "Someone criticised me", "I was ignored or overlooked", "Things didn't go to plan", "I was running late", "Someone disagreed with me"],
    why1: ["I felt out of control", "I felt disrespected", "I felt not good enough", "I felt rejected", "I felt unsafe", "I felt like a failure", "I felt invisible", "I felt attacked"],
    why2: ["Control means safety to me", "Respect means I matter", "I need to be perfect", "Rejection means abandonment", "Chaos feels dangerous", "Mistakes mean I'm flawed", "Being seen means I exist", "Criticism feels like threat"],
    why3: ["As a child, chaos meant danger", "I learned love was conditional", "Mistakes were punished", "I had to earn belonging", "I wasn't allowed to fail", "My needs weren't met", "I had to be useful to be valued", "Vulnerability was weakness"],
    conclusion: ["This is about needing safety", "This is about needing control", "This is about needing belonging", "This is about proving my worth", "This is about fear of abandonment", "This is about old survival patterns", "This is about needing validation"]
  },
  rule3: {
    label: ["I am organised", "I am kind", "I am logical", "I am strong", "I am independent", "I am reliable", "I am calm", "I am hardworking", "I am easygoing", "I am responsible"],
    fear: ["I'll be a complete mess", "I'll be seen as mean", "I'll seem irrational", "I'll appear weak", "I'll be too needy", "I'll let everyone down", "I'll lose control", "I'll be seen as lazy", "I'll seem difficult", "I'll be irresponsible"],
    integration: [
      "I am organised, AND I can handle chaos when it comes",
      "I am kind, AND I can be firm when I need to protect myself", 
      "I am logical, AND I can trust my gut feelings",
      "I am strong, AND I can ask for help when I need it",
      "I am independent, AND I can lean on others sometimes",
      "I am reliable, AND I can say no without guilt",
      "I am calm, AND I can express anger when needed",
      "I am hardworking, AND I deserve rest without earning it"
    ]
  },
  rule4: {
    values: ["Always work hard", "Be polite and pleasant", "Don't show weakness", "Put others first", "Save money, don't waste", "Don't complain", "Be independent", "Stay humble", "Keep emotions private", "Always be productive"]
  },
  rule5: {
    event: ["Plans got cancelled", "I made a mistake", "Someone was rude to me", "I missed an opportunity", "Something broke down", "I got unexpected bad news", "Traffic made me late", "I lost something important", "Someone let me down"],
    judgment: ["This always happens to me", "The universe hates me", "My day is completely ruined", "This is a disaster", "I can't catch a break", "Everything's going wrong", "Why me?", "This shouldn't be happening", "I'm so unlucky"],
    neutral: ["This happened. I can respond.", "This is a moment, not a verdict.", "Facts only: [thing] occurred.", "This is one event in my day.", "I'm dealing with [specific issue].", "This requires my attention now."],
    acceptance: ["This is part of my day, like everything else", "I can hold this alongside the good", "This moment will pass like all others", "This is life including me in its fullness", "I accept this is happening right now"]
  }
};

const ButtonSelect = ({ options, value, onChange, placeholder, columns = 2 }) => {
  const [showOther, setShowOther] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const isCustom = value && !options.includes(value);

  const handleSelect = (option) => {
    onChange(option);
    setShowOther(false);
  };

  const handleOther = () => {
    setShowOther(true);
    setCustomValue(isCustom ? value : '');
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setShowOther(false);
    }
  };

  if (showOther) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            autoFocus
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
            placeholder={placeholder || "Type your answer..."}
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button onClick={handleCustomSubmit} className="px-4 rounded-lg bg-white/20 hover:bg-white/30">
            <Check size={18} />
          </button>
          <button onClick={() => setShowOther(false)} className="px-3 rounded-lg bg-white/10 hover:bg-white/20">
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-2 ${columns === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`p-3 rounded-lg text-left text-sm transition ${
            value === option 
              ? 'bg-white/25 border-2 border-white/40' 
              : 'bg-white/10 border border-white/20 hover:bg-white/15'
          }`}
        >
          {option}
        </button>
      ))}
      <button
        onClick={handleOther}
        className={`p-3 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
          isCustom
            ? 'bg-white/25 border-2 border-white/40 col-span-full'
            : 'bg-white/5 border border-dashed border-white/30 hover:bg-white/10 hover:border-white/40'
        }`}
      >
        {isCustom ? (
          <span>"{value}"</span>
        ) : (
          <>
            <Plus size={16} /> Other
          </>
        )}
      </button>
    </div>
  );
};

export default function FiveRulesWorkbook() {
  const [currentView, setCurrentView] = useState('home');
  const [currentRule, setCurrentRule] = useState(1);
  const [responses, setResponses] = useState({
    rule1: { trigger: '', trait: '', mirror: '', instance: '' },
    rule2: { event: '', why1: '', why2: '', why3: '', conclusion: '' },
    rule3: { label: '', fear: '', integration: '' },
    rule4: { values: ['', '', '', '', ''], sources: ['', '', '', '', ''], decisions: ['', '', '', '', ''] },
    rule5: { event: '', judgment: '', neutral: '', acceptance: '' }
  });
  const [completedRules, setCompletedRules] = useState([]);

  const updateResponse = (rule, field, value, index = null) => {
    setResponses(prev => {
      if (index !== null) {
        const newArray = [...prev[rule][field]];
        newArray[index] = value;
        return { ...prev, [rule]: { ...prev[rule], [field]: newArray } };
      }
      return { ...prev, [rule]: { ...prev[rule], [field]: value } };
    });
  };

  const markComplete = (ruleNum) => {
    if (!completedRules.includes(ruleNum)) {
      setCompletedRules([...completedRules, ruleNum]);
    }
  };

  const resetAll = () => {
    setResponses({
      rule1: { trigger: '', trait: '', mirror: '', instance: '' },
      rule2: { event: '', why1: '', why2: '', why3: '', conclusion: '' },
      rule3: { label: '', fear: '', integration: '' },
      rule4: { values: ['', '', '', '', ''], sources: ['', '', '', '', ''], decisions: ['', '', '', '', ''] },
      rule5: { event: '', judgment: '', neutral: '', acceptance: '' }
    });
    setCompletedRules([]);
    setCurrentView('home');
  };

  const NavButtons = ({ onBack, onNext, canComplete, ruleNum }) => (
    <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
      <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
        <ChevronLeft size={18} /> Back
      </button>
      <button 
        onClick={() => { if(canComplete) markComplete(ruleNum); onNext(); }}
        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition font-medium"
      >
        {canComplete ? 'Complete' : 'Next'} <ChevronRight size={18} />
      </button>
    </div>
  );

  const QuestionBlock = ({ number, label, hint, children }) => (
    <div className="p-4 rounded-xl bg-white/5">
      <label className="block text-sm font-medium text-white/90 mb-1">{number}. {label}</label>
      {hint && <p className="text-xs text-white/50 mb-3">{hint}</p>}
      {children}
    </div>
  );

  // HOME VIEW
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-light mb-3">The 5 Rules</h1>
            <p className="text-white/60 text-sm">A workbook for integration and individuation</p>
            <p className="text-white/40 text-xs mt-2">{completedRules.length}/5 completed</p>
          </div>
          
          <div className="space-y-3">
            {rules.map((rule) => {
              const Icon = rule.icon;
              const isComplete = completedRules.includes(rule.id);
              return (
                <button
                  key={rule.id}
                  onClick={() => { setCurrentRule(rule.id); setCurrentView('rule'); }}
                  className={`w-full p-4 rounded-xl bg-gradient-to-r ${rule.color} flex items-center gap-4 hover:opacity-90 transition group`}
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-white/60 mb-1">Rule {rule.id}</div>
                    <div className="font-medium">{rule.title}</div>
                  </div>
                  {isComplete && (
                    <div className="p-1 rounded-full bg-green-500/30">
                      <Check size={16} className="text-green-300" />
                    </div>
                  )}
                  <ChevronRight size={20} className="text-white/40 group-hover:text-white/70 transition" />
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={() => setCurrentView('summary')} className="flex-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm flex items-center justify-center gap-2">
              <Download size={16} /> View Summary
            </button>
            <button onClick={resetAll} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition" title="Reset all">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUMMARY VIEW
  if (currentView === 'summary') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-white/60 hover:text-white mb-6">
            <ChevronLeft size={18} /> Back to Rules
          </button>
          <h1 className="text-2xl font-light mb-6">Your Reflections</h1>
          
          <div className="space-y-6 text-sm">
            {responses.rule1.trigger && (
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-3 text-slate-300">Rule 1: Shadow Work</h3>
                <p><span className="text-white/50">Trigger:</span> {responses.rule1.trigger}</p>
                <p><span className="text-white/50">Trait:</span> {responses.rule1.trait}</p>
                <p><span className="text-white/50">Mirror:</span> {responses.rule1.mirror}</p>
                <p><span className="text-white/50">Instance:</span> {responses.rule1.instance}</p>
              </div>
            )}
            {responses.rule2.event && (
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-3 text-indigo-300">Rule 2: The Why Chain</h3>
                <p><span className="text-white/50">Event:</span> {responses.rule2.event}</p>
                <p><span className="text-white/50">→</span> {responses.rule2.why1}</p>
                <p><span className="text-white/50">→</span> {responses.rule2.why2}</p>
                <p><span className="text-white/50">→</span> {responses.rule2.why3}</p>
                <p className="mt-2 text-indigo-200"><span className="text-white/50">Insight:</span> {responses.rule2.conclusion}</p>
              </div>
            )}
            {responses.rule3.label && (
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-3 text-violet-300">Rule 3: Integration</h3>
                <p><span className="text-white/50">Label:</span> {responses.rule3.label}</p>
                <p><span className="text-white/50">Fear:</span> {responses.rule3.fear}</p>
                <p className="mt-2 text-violet-200">{responses.rule3.integration}</p>
              </div>
            )}
            {responses.rule4.values.some(v => v) && (
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-3 text-emerald-300">Rule 4: Values Sort</h3>
                {responses.rule4.values.map((v, i) => v && (
                  <p key={i} className="flex gap-2"><span className="text-white/50">{v}:</span> <span className="text-emerald-200/70">{responses.rule4.sources[i]}</span> → <span>{responses.rule4.decisions[i]}</span></p>
                ))}
              </div>
            )}
            {responses.rule5.event && (
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-3 text-amber-300">Rule 5: Neutral Fact</h3>
                <p><span className="text-white/50">Event:</span> {responses.rule5.event}</p>
                <p><span className="text-white/50">Story:</span> <span className="line-through text-white/40">{responses.rule5.judgment}</span></p>
                <p><span className="text-white/50">Neutral:</span> {responses.rule5.neutral}</p>
                <p className="mt-2 text-amber-200">{responses.rule5.acceptance}</p>
              </div>
            )}
            {!Object.values(responses).some(r => Object.values(r).flat().some(v => v)) && (
              <p className="text-white/40 text-center py-8">Complete the exercises to see your reflections here.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RULE VIEWS
  const rule = rules[currentRule - 1];
  const Icon = rule.icon;
  
  const RuleHeader = ({ description }) => (
    <div className="mb-6">
      <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-white/60 hover:text-white mb-4">
        <ChevronLeft size={18} /> All Rules
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${rule.color}`}>
          <Icon size={28} />
        </div>
        <div>
          <div className="text-xs text-white/50">Rule {currentRule}</div>
          <h1 className="text-xl font-medium">{rule.title}</h1>
        </div>
      </div>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        
        {currentRule === 1 && (
          <>
            <RuleHeader description="We often see our shadow traits—rejected parts of ourselves—in others who trigger strong reactions in us." />
            <div className="space-y-4">
              <QuestionBlock number="1" label="Who triggers you?" hint="Think of someone who irritates or fascinates you">
                <ButtonSelect options={presets.rule1.trigger} value={responses.rule1.trigger} onChange={(v) => updateResponse('rule1', 'trigger', v)} placeholder="Describe who..." />
              </QuestionBlock>
              <QuestionBlock number="2" label="What trait bothers you?" hint="What specific quality do you react to?">
                <ButtonSelect options={presets.rule1.trait} value={responses.rule1.trait} onChange={(v) => updateResponse('rule1', 'trait', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="3" label="The Mirror Question" hint="How does this trait show up in YOU?">
                <ButtonSelect options={presets.rule1.mirror} value={responses.rule1.mirror} onChange={(v) => updateResponse('rule1', 'mirror', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="4" label="When did you show this trait?" hint="A specific time you exhibited this">
                <ButtonSelect options={presets.rule1.instance} value={responses.rule1.instance} onChange={(v) => updateResponse('rule1', 'instance', v)} columns={1} />
              </QuestionBlock>
            </div>
            <NavButtons onBack={() => setCurrentView('home')} onNext={() => setCurrentRule(2)} canComplete={responses.rule1.instance} ruleNum={1} />
          </>
        )}

        {currentRule === 2 && (
          <>
            <RuleHeader description="Strong reactions often come from unconscious patterns. The 'Why Chain' helps trace reactions to their root." />
            <div className="space-y-4">
              <QuestionBlock number="1" label="What happened?" hint="A reaction that seemed bigger than the situation warranted">
                <ButtonSelect options={presets.rule2.event} value={responses.rule2.event} onChange={(v) => updateResponse('rule2', 'event', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="2" label="Why did that bother you?">
                <ButtonSelect options={presets.rule2.why1} value={responses.rule2.why1} onChange={(v) => updateResponse('rule2', 'why1', v)} />
              </QuestionBlock>
              <QuestionBlock number="3" label="Why does that matter to you?">
                <ButtonSelect options={presets.rule2.why2} value={responses.rule2.why2} onChange={(v) => updateResponse('rule2', 'why2', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="4" label="Where does that come from?">
                <ButtonSelect options={presets.rule2.why3} value={responses.rule2.why3} onChange={(v) => updateResponse('rule2', 'why3', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="5" label="What's this really about?">
                <ButtonSelect options={presets.rule2.conclusion} value={responses.rule2.conclusion} onChange={(v) => updateResponse('rule2', 'conclusion', v)} columns={1} />
              </QuestionBlock>
            </div>
            <NavButtons onBack={() => setCurrentRule(1)} onNext={() => setCurrentRule(3)} canComplete={responses.rule2.conclusion} ruleNum={2} />
          </>
        )}

        {currentRule === 3 && (
          <>
            <RuleHeader description="Being one-sided makes you fragile. Integration means accepting you contain both ends of any spectrum." />
            <div className="space-y-4">
              <QuestionBlock number="1" label="A label you identify with" hint="How do you define yourself?">
                <ButtonSelect options={presets.rule3.label} value={responses.rule3.label} onChange={(v) => updateResponse('rule3', 'label', v)} />
              </QuestionBlock>
              <QuestionBlock number="2" label="What you fear if you're not this" hint="The opposite feels like...">
                <ButtonSelect options={presets.rule3.fear} value={responses.rule3.fear} onChange={(v) => updateResponse('rule3', 'fear', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="3" label="Your Both/And Statement" hint="Embrace both sides of yourself">
                <ButtonSelect options={presets.rule3.integration} value={responses.rule3.integration} onChange={(v) => updateResponse('rule3', 'integration', v)} columns={1} placeholder="I am [X], AND I can also [Y] when..." />
              </QuestionBlock>
            </div>
            <NavButtons onBack={() => setCurrentRule(2)} onNext={() => setCurrentRule(4)} canComplete={responses.rule3.integration} ruleNum={3} />
          </>
        )}

        {currentRule === 4 && (
          <>
            <RuleHeader description="Sort your values: which are truly yours, and which were given to you by others?" />
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="p-4 rounded-xl bg-white/5 space-y-3">
                  <ButtonSelect 
                    options={presets.rule4.values.filter(v => !responses.rule4.values.includes(v) || responses.rule4.values[i] === v)} 
                    value={responses.rule4.values[i]} 
                    onChange={(v) => updateResponse('rule4', 'values', v, i)} 
                    columns={1}
                    placeholder="Type a value or rule you live by..."
                  />
                  {responses.rule4.values[i] && (
                    <div className="flex gap-2 pt-2">
                      <select
                        value={responses.rule4.sources[i]}
                        onChange={(e) => updateResponse('rule4', 'sources', e.target.value, i)}
                        className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none"
                      >
                        <option value="" className="bg-slate-800">Who gave you this?</option>
                        <option value="Me" className="bg-slate-800">Me (my own)</option>
                        <option value="Parent" className="bg-slate-800">Parent</option>
                        <option value="Teacher" className="bg-slate-800">Teacher</option>
                        <option value="Society" className="bg-slate-800">Society/Culture</option>
                        <option value="Religion" className="bg-slate-800">Religion</option>
                        <option value="Peers" className="bg-slate-800">Peers</option>
                      </select>
                      <select
                        value={responses.rule4.decisions[i]}
                        onChange={(e) => updateResponse('rule4', 'decisions', e.target.value, i)}
                        className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none"
                      >
                        <option value="" className="bg-slate-800">Your decision?</option>
                        <option value="Keep — it's mine" className="bg-slate-800">✓ Keep — it's mine</option>
                        <option value="Adopt consciously" className="bg-slate-800">✓ Adopt consciously</option>
                        <option value="Let it go" className="bg-slate-800">✗ Let it go</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <NavButtons onBack={() => setCurrentRule(3)} onNext={() => setCurrentRule(5)} canComplete={responses.rule4.values.filter(v => v).length >= 3} ruleNum={4} />
          </>
        )}

        {currentRule === 5 && (
          <>
            <RuleHeader description="Strip away judgment from events. What remains is just life, including you in its wholeness." />
            <div className="space-y-4">
              <QuestionBlock number="1" label="Something 'negative' that happened">
                <ButtonSelect options={presets.rule5.event} value={responses.rule5.event} onChange={(v) => updateResponse('rule5', 'event', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="2" label="The story your mind told" hint="The judgments and catastrophising">
                <ButtonSelect options={presets.rule5.judgment} value={responses.rule5.judgment} onChange={(v) => updateResponse('rule5', 'judgment', v)} />
              </QuestionBlock>
              <QuestionBlock number="3" label="Rewrite as neutral fact" hint="Just the facts, no drama">
                <ButtonSelect options={presets.rule5.neutral} value={responses.rule5.neutral} onChange={(v) => updateResponse('rule5', 'neutral', v)} columns={1} />
              </QuestionBlock>
              <QuestionBlock number="4" label="Acceptance statement" hint="Place this moment in the whole of your day">
                <ButtonSelect options={presets.rule5.acceptance} value={responses.rule5.acceptance} onChange={(v) => updateResponse('rule5', 'acceptance', v)} columns={1} />
              </QuestionBlock>
            </div>
            <NavButtons onBack={() => setCurrentRule(4)} onNext={() => { markComplete(5); setCurrentView('home'); }} canComplete={responses.rule5.acceptance} ruleNum={5} />
          </>
        )}
      </div>
    </div>
  );
}
