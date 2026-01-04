import { RuleHeader } from '../components/RuleHeader';
import { NavButtons } from '../components/NavButtons';
import { QuestionBlock } from '../components/QuestionBlock';
import { ButtonSelect } from '../components/ButtonSelect';
import type { Journey, JourneyResponses } from '../types';
import { rules } from '../data/rules';
import { presets } from '../data/presets';

interface RuleScreenProps {
    ruleId: number;
    journey: Journey;
    onUpdateResponse: (rule: keyof JourneyResponses, field: string, value: string, index?: number | null) => void;
    onComplete: () => void;
    onBack: () => void;
    onNext: () => void;
}

export function RuleScreen({ ruleId, journey, onUpdateResponse, onComplete, onBack, onNext }: RuleScreenProps) {
    const rule = rules.find(r => r.id === ruleId)!;
    const responses = journey.responses;

    const handleComplete = () => {
        onComplete();
        onNext();
    };

    const commonProps = {
        onBack,
        onNext: handleComplete
    };

    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
                <RuleHeader rule={rule} onBack={onBack} />

                {ruleId === 1 && (
                    <>
                        <div className="space-y-4">
                            <QuestionBlock number="1" label="Who triggers you?" hint="Think of someone who irritates or fascinates you">
                                <ButtonSelect
                                    options={presets.rule1.trigger}
                                    value={responses.rule1.trigger}
                                    onChange={(v) => onUpdateResponse('rule1', 'trigger', v)}
                                    placeholder="Describe who..."
                                />
                            </QuestionBlock>
                            <QuestionBlock number="2" label="What trait bothers you?" hint="What specific quality do you react to?">
                                <ButtonSelect
                                    options={presets.rule1.trait}
                                    value={responses.rule1.trait}
                                    onChange={(v) => onUpdateResponse('rule1', 'trait', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="3" label="The Mirror Question" hint="How does this trait show up in YOU?">
                                <ButtonSelect
                                    options={presets.rule1.mirror}
                                    value={responses.rule1.mirror}
                                    onChange={(v) => onUpdateResponse('rule1', 'mirror', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="4" label="When did you show this trait?" hint="A specific time you exhibited this">
                                <ButtonSelect
                                    options={presets.rule1.instance}
                                    value={responses.rule1.instance}
                                    onChange={(v) => onUpdateResponse('rule1', 'instance', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                        </div>
                        <NavButtons {...commonProps} canComplete={!!responses.rule1.instance} />
                    </>
                )}

                {ruleId === 2 && (
                    <>
                        <div className="space-y-4">
                            <QuestionBlock number="1" label="What happened?" hint="A reaction that seemed bigger than the situation warranted">
                                <ButtonSelect
                                    options={presets.rule2.event}
                                    value={responses.rule2.event}
                                    onChange={(v) => onUpdateResponse('rule2', 'event', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="2" label="Why did that bother you?">
                                <ButtonSelect
                                    options={presets.rule2.why1}
                                    value={responses.rule2.why1}
                                    onChange={(v) => onUpdateResponse('rule2', 'why1', v)}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="3" label="Why does that matter to you?">
                                <ButtonSelect
                                    options={presets.rule2.why2}
                                    value={responses.rule2.why2}
                                    onChange={(v) => onUpdateResponse('rule2', 'why2', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="4" label="Where does that come from?">
                                <ButtonSelect
                                    options={presets.rule2.why3}
                                    value={responses.rule2.why3}
                                    onChange={(v) => onUpdateResponse('rule2', 'why3', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="5" label="What's this really about?">
                                <ButtonSelect
                                    options={presets.rule2.conclusion}
                                    value={responses.rule2.conclusion}
                                    onChange={(v) => onUpdateResponse('rule2', 'conclusion', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                        </div>
                        <NavButtons {...commonProps} canComplete={!!responses.rule2.conclusion} />
                    </>
                )}

                {ruleId === 3 && (
                    <>
                        <div className="space-y-4">
                            <QuestionBlock number="1" label="A label you identify with" hint="How do you define yourself?">
                                <ButtonSelect
                                    options={presets.rule3.label}
                                    value={responses.rule3.label}
                                    onChange={(v) => onUpdateResponse('rule3', 'label', v)}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="2" label="What you fear if you're not this" hint="The opposite feels like...">
                                <ButtonSelect
                                    options={presets.rule3.fear}
                                    value={responses.rule3.fear}
                                    onChange={(v) => onUpdateResponse('rule3', 'fear', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="3" label="Your Both/And Statement" hint="Embrace both sides of yourself">
                                <ButtonSelect
                                    options={presets.rule3.integration}
                                    value={responses.rule3.integration}
                                    onChange={(v) => onUpdateResponse('rule3', 'integration', v)}
                                    columns={1}
                                    placeholder="I am [X], AND I can also [Y] when..."
                                />
                            </QuestionBlock>
                        </div>
                        <NavButtons {...commonProps} canComplete={!!responses.rule3.integration} />
                    </>
                )}

                {ruleId === 4 && (
                    <>
                        <div className="space-y-4">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} className="p-5 rounded-2xl bg-white/60 border border-[var(--color-clay-light)] space-y-4 animate-fade-in">
                                    <ButtonSelect
                                        options={presets.rule4.values.filter(v => !responses.rule4.values.includes(v) || responses.rule4.values[i] === v)}
                                        value={responses.rule4.values[i]}
                                        onChange={(v) => onUpdateResponse('rule4', 'values', v, i)}
                                        columns={1}
                                        placeholder="Type a value or rule you live by..."
                                    />
                                    {responses.rule4.values[i] && (
                                        <div className="flex gap-2 pt-2">
                                            <select
                                                value={responses.rule4.sources[i]}
                                                onChange={(e) => onUpdateResponse('rule4', 'sources', e.target.value, i)}
                                                className="flex-1 p-3 rounded-xl bg-white border border-[var(--color-clay-light)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] min-h-[48px]"
                                                aria-label={`Who gave you the value "${responses.rule4.values[i]}"?`}
                                            >
                                                <option value="">Who gave you this?</option>
                                                <option value="Me">Me (my own)</option>
                                                <option value="Parent">Parent</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Society">Society/Culture</option>
                                                <option value="Religion">Religion</option>
                                                <option value="Peers">Peers</option>
                                            </select>
                                            <select
                                                value={responses.rule4.decisions[i]}
                                                onChange={(e) => onUpdateResponse('rule4', 'decisions', e.target.value, i)}
                                                className="flex-1 p-3 rounded-xl bg-white border border-[var(--color-clay-light)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] min-h-[48px]"
                                                aria-label={`Your decision about "${responses.rule4.values[i]}"`}
                                            >
                                                <option value="">Your decision?</option>
                                                <option value="Keep — it's mine">✓ Keep — it's mine</option>
                                                <option value="Adopt consciously">✓ Adopt consciously</option>
                                                <option value="Let it go">✗ Let it go</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <NavButtons {...commonProps} canComplete={responses.rule4.values.filter(v => v).length >= 3} />
                    </>
                )}

                {ruleId === 5 && (
                    <>
                        <div className="space-y-4">
                            <QuestionBlock number="1" label="Something 'negative' that happened">
                                <ButtonSelect
                                    options={presets.rule5.event}
                                    value={responses.rule5.event}
                                    onChange={(v) => onUpdateResponse('rule5', 'event', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="2" label="The story your mind told" hint="The judgments and catastrophising">
                                <ButtonSelect
                                    options={presets.rule5.judgment}
                                    value={responses.rule5.judgment}
                                    onChange={(v) => onUpdateResponse('rule5', 'judgment', v)}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="3" label="Rewrite as neutral fact" hint="Just the facts, no drama">
                                <ButtonSelect
                                    options={presets.rule5.neutral}
                                    value={responses.rule5.neutral}
                                    onChange={(v) => onUpdateResponse('rule5', 'neutral', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                            <QuestionBlock number="4" label="Acceptance statement" hint="Place this moment in the whole of your day">
                                <ButtonSelect
                                    options={presets.rule5.acceptance}
                                    value={responses.rule5.acceptance}
                                    onChange={(v) => onUpdateResponse('rule5', 'acceptance', v)}
                                    columns={1}
                                />
                            </QuestionBlock>
                        </div>
                        <NavButtons {...commonProps} canComplete={!!responses.rule5.acceptance} />
                    </>
                )}
            </div>
        </div>
    );
}
