import type { Template } from '../types';

export const templates: Template[] = [
  // HOOKS (1-10)
  {
    id: 'hook-contradiction',
    name: 'The Contradiction Hook',
    category: 'hook',
    description: 'Start with a seemingly negative statement, then reframe it positively. Creates instant curiosity.',
    pattern: `[Seemingly negative statement]. [Positive reframe].

[Brief story or context explaining the transformation]

[Key lessons learned - 3-5 points]

[Inspiring conclusion]

[Engagement question]`,
    example: `I got rejected from my dream job. It was the best thing that ever happened to me.

6 months later, I started my own company. That rejection forced me to bet on myself.

Sometimes the closed door is actually a redirection.

Here's what I learned about rejection:

1. It's rarely personal—it's about fit
2. Every "no" contains information
3. The sting fades, the lesson stays
4. Your backup plan might be your best plan

That job I wanted? The company laid off 200 people last year.

Meanwhile, I've built something I own.

Rejection isn't failure. It's redirection.

What rejection turned into an opportunity for you?`,
    placeholders: ['negative event', 'positive outcome', 'time frame', 'lessons learned'],
    bestFor: ['Career stories', 'Mindset shifts', 'Personal branding', 'Transformation narratives'],
    tips: [
      'The contrast should be genuine, not forced',
      'Include specific details to make it believable',
      'End with a universal truth others can relate to'
    ]
  },
  {
    id: 'hook-unexpected-number',
    name: 'The Unexpected Number',
    category: 'hook',
    description: 'Lead with an impressive number that establishes credibility and promises valuable insights.',
    pattern: `I've [done X] [impressive number] times. Here's what [I learned/nobody tells you]:

[Brief context about the journey]

[Phase 1 insights]
[Phase 2 insights]
[Phase 3 insights]

[The real secret/insight]

[Call to action or question]`,
    example: `I've written 500 LinkedIn posts in the last 18 months. Here's what nobody tells you about consistency:

The first 100 posts? Crickets. Maybe 50 likes if I was lucky.

Posts 100-300? Started seeing patterns. Some topics resonated, others flopped.

Posts 300-500? Now I can predict within 20% how a post will perform before I hit publish.

The secret isn't talent. It's pattern recognition through volume.

You can't think your way to understanding what works. You have to publish your way there.

Most people quit at post 50 because they're not "seeing results."

They're measuring the wrong thing.

The result isn't likes. It's learning what your audience actually wants.

That only comes from reps.

How many posts are you willing to write before you expect results?`,
    placeholders: ['activity', 'impressive number', 'time period', 'phases of learning'],
    bestFor: ['Expertise positioning', 'Teaching moments', 'Credibility building'],
    tips: [
      'Use specific, odd numbers (500 feels more real than 500)',
      'Break the journey into distinct phases',
      'The insight should be counterintuitive'
    ]
  },
  {
    id: 'hook-confession',
    name: 'The Confession',
    category: 'hook',
    description: 'Admit to a past mistake or wrong belief, then share what you learned. Builds trust through vulnerability.',
    pattern: `I used to [believe/do something wrong]. [Realization moment].

[What the old approach looked like]

[What changed]

[New approach with specific details]

[Results of the change]

[Lesson for others]

[Question to audience]`,
    example: `I used to respond to every email within 5 minutes. I thought it made me look responsive and professional.

It made me look available. And availability is the enemy of value.

Last year I changed my approach:
- Email twice a day: 9am and 4pm
- No notifications on my phone
- Auto-responder setting expectations

What happened?

→ My response quality went up
→ My stress went down
→ Nobody complained (not once)
→ I got 3 hours back daily

The people who matter will wait 4 hours for a thoughtful response.

The people who can't wait? They're not your people.

Responsiveness is not the same as effectiveness.

What habit did you quit that everyone told you was essential?`,
    placeholders: ['old belief/behavior', 'realization', 'new approach', 'results'],
    bestFor: ['Contrarian takes', 'Personal growth stories', 'Practical advice'],
    tips: [
      'Be specific about what you used to do wrong',
      'The new approach should be actionable',
      'Include concrete results to prove the change worked'
    ]
  },
  {
    id: 'hook-bold-claim',
    name: 'The Bold Claim',
    category: 'hook',
    description: 'Challenge conventional wisdom with a strong statement, then back it up with reasoning.',
    pattern: `[Strong statement challenging conventional wisdom].

[Things you tried that didn't work]

[What actually works]

[Reframe of the original claim]

[Actionable advice]

[Polarizing close - agree or disagree?]`,
    example: `Your morning routine doesn't matter.

I've tried:
- 5am wake-ups
- Cold showers
- Meditation
- Journaling
- The Miracle Morning

None of it made me more successful.

You know what did?

Working on the right problem.

You can have the perfect morning routine and still spend your day on low-impact tasks.

The most productive people I know don't have fancy routines. They have clarity on what matters.

Before optimizing your morning, ask yourself:

Am I even working on the right thing?

Because a perfect start to the wrong day is still a wasted day.

Agree or disagree?`,
    placeholders: ['controversial claim', 'things tried', 'actual solution', 'reframe'],
    bestFor: ['Thought leadership', 'Sparking debate', 'Standing out'],
    tips: [
      'The claim should be defensible, not just contrarian for clicks',
      'Acknowledge what you tried before dismissing it',
      'End with a question to drive engagement'
    ]
  },
  {
    id: 'hook-timestamp',
    name: 'The Time Stamp',
    category: 'hook',
    description: 'Contrast your past and present state with a specific time reference. Shows transformation.',
    pattern: `[Time period] ago, I was [past state]. Today, [current state]. Here's what changed.

[Description of past situation]

[The shift that happened]

[Before vs After comparison]

[What you learned]

[Advice for others in the past situation]

[Question]`,
    example: `4 years ago, I was mass-applying to jobs. 200+ applications. 3 interviews. 0 offers.

Today, I turn down 5 inbound opportunities a week.

The difference? I stopped job hunting and started building in public.

Here's the shift:

THEN: "Please hire me, I can do anything"
NOW: "Here's my specific expertise, demonstrated publicly"

THEN: Resume as my only proof of value
NOW: Content, projects, and testimonials doing the selling

THEN: Competing with 500 applicants
NOW: The only person in the conversation

You don't need to be famous. You need to be findable.

When someone Googles your name + your skill, what do they find?

That's your real resume now.

What's one thing you could create this month that showcases your expertise?`,
    placeholders: ['time ago', 'past state', 'current state', 'before/after comparisons'],
    bestFor: ['Transformation stories', 'Credibility building', 'Inspiration'],
    tips: [
      'Use specific numbers for both timeframe and results',
      'The contrast should be dramatic but believable',
      'Make the path replicable for others'
    ]
  },
  {
    id: 'hook-relatable-struggle',
    name: 'The Relatable Struggle',
    category: 'hook',
    description: 'Start with a common frustration everyone experiences, then offer your perspective or solution.',
    pattern: `[Common frustration everyone experiences].

[Escalating anxiety/frustration - with humor]

[The resolution]

[Your insight about the situation]

[Reframe or advice]

[Engagement prompt]`,
    example: `You send a Slack message at 2pm.

By 2:01pm you're wondering if they hate you.

By 2:05pm you've reread your message 4 times looking for what you said wrong.

By 2:10pm you're mentally updating your resume.

At 2:15pm they respond "sounds good 👍"

We've all been there.

Here's what I've learned: the anxiety we feel waiting for responses says nothing about the response coming. It says everything about our relationship with uncertainty.

The fix isn't getting faster responses. It's getting comfortable with the wait.

Send the message. Close the app. Trust that no response doesn't mean bad response.

Everyone is just busy living their own life.

Drop a 🙋 if you've catastrophized a slow response.`,
    placeholders: ['common frustration', 'escalating anxiety', 'realization', 'advice'],
    bestFor: ['Engagement', 'Relatability', 'Building connection'],
    tips: [
      'Use specific, vivid details that trigger recognition',
      'Humor works well but keep it professional',
      'The insight should be genuinely helpful, not just commiseration'
    ]
  },
  {
    id: 'hook-question',
    name: 'The Question Hook',
    category: 'hook',
    description: 'Open with a provocative question that makes people stop scrolling to find the answer.',
    pattern: `[Provocative question]?

[Brief context]

[Observation or pattern you've noticed]

[Your answer/insight]

[Framework or advice]

[Closing question]`,
    example: `Why do the most talented people often get passed over for promotions?

I've seen it happen at every company I've worked at.

The hardest worker stays stuck. The person who "plays the game" advances.

It bothered me for years until I realized: the game isn't optional.

But it's not what you think.

"Playing the game" isn't about politics. It's about:

→ Making your work visible to decision-makers
→ Building relationships before you need them
→ Understanding what your boss is measured on
→ Asking for what you want (nobody reads minds)

Talent is table stakes. It gets you in the room.

What gets you ahead is making sure the right people know what you bring.

Stop hoping to be discovered. Start being strategic about visibility.

What's one thing you could do this week to make your work more visible?`,
    placeholders: ['provocative question', 'context', 'insight', 'action items'],
    bestFor: ['Thought-provoking content', 'Career advice', 'Building authority'],
    tips: [
      'The question should have an unexpected answer',
      'Avoid questions with obvious answers',
      'The content should fully answer the opening question'
    ]
  },
  {
    id: 'hook-observation',
    name: 'The Observation',
    category: 'hook',
    description: 'Share a pattern you\'ve noticed that others haven\'t articulated yet.',
    pattern: `I've noticed [pattern].

[Two contrasting approaches]

[The subtle but important difference]

[What this signals]

[Advice for the reader]

[Question]`,
    example: `I've noticed something about the people who get promoted fastest:

They don't ask "what should I do?"

They say "here's what I'm thinking, does this make sense?"

The difference seems small. It's not.

The first puts the burden on your manager.
The second shows you've already done the thinking.

In 10 seconds, you've signaled:
- You take initiative
- You can think independently
- You respect their time
- You're ready for more responsibility

Managers aren't looking for people who follow instructions.

They're looking for people who reduce their workload.

Next time you have a question, try: "Here's my recommendation. Am I missing anything?"

Watch how differently people respond to you.

What's a phrase you've changed that shifted how people perceive you?`,
    placeholders: ['observation', 'two approaches', 'difference', 'advice'],
    bestFor: ['Leadership content', 'Tactical advice', 'Career development'],
    tips: [
      'The observation should be specific and actionable',
      'Show the subtle difference that makes a big impact',
      'Make it immediately applicable'
    ]
  },
  {
    id: 'hook-behind-scenes',
    name: 'The Behind-the-Scenes',
    category: 'hook',
    description: 'Reveal the messy reality behind a polished success. Builds authenticity and relatability.',
    pattern: `You see: [Polished outcome]

You don't see:

→ [Hidden struggle 1]
→ [Hidden struggle 2]
→ [Hidden struggle 3]
→ [Hidden struggle 4]
→ [Hidden struggle 5]

[Lesson about perception vs reality]

[Encouragement for those in the messy middle]

[Question]`,
    example: `You see: "Just raised a $2M seed round!"

You don't see:

→ 147 investor rejections
→ 6 months of runway left when we closed
→ Pitch deck rewritten 23 times
→ 3am panic attacks about making payroll
→ Co-founder nearly quitting twice
→ Celebrating with a $8 bottle of wine because we couldn't afford more

Every success story is an edited highlight reel.

The rejection, doubt, and struggle get cut.

This creates a dangerous illusion: that success comes easier to others than it will to you.

It doesn't.

Everyone's process is messier than their LinkedIn posts suggest.

Including mine. Including yours.

If you're in the messy middle right now—keep going.

That's exactly where you're supposed to be.

What's something you achieved that looked easy from the outside but wasn't?`,
    placeholders: ['polished win', 'hidden struggles (5-6)', 'lesson about the journey'],
    bestFor: ['Authenticity', 'Relatability', 'Founder/leader content'],
    tips: [
      'Be specific with numbers and details',
      'Include emotional struggles, not just practical ones',
      'The vulnerability should feel genuine, not performative'
    ]
  },
  {
    id: 'hook-younger-self',
    name: 'What I\'d Tell My Younger Self',
    category: 'hook',
    description: 'Share advice for your past self. Works because readers project themselves into the advice.',
    pattern: `What I'd tell [younger self/someone starting out]:

1. [Advice 1 with brief context]

2. [Advice 2 with brief context]

3. [Advice 3 with brief context]

... (continue 7-10 points)

[Reflection that you're still learning]

[Question for audience]`,
    example: `What I'd tell 22-year-old me on her first day at work:

1. Your manager isn't scary. They're just busy. Ask more questions.

2. "I don't know, but I'll find out" is a perfectly good answer.

3. The people who seem like they have it all figured out? They don't.

4. Saying yes to everything isn't dedication. It's a path to burnout.

5. One genuine relationship > 50 LinkedIn connections

6. Nobody notices your mistakes as much as you do.

7. The skills you think are "soft" are actually the hardest and most valuable.

8. Your first job isn't your destiny. It's data collection.

9. Ask for feedback even when you're scared of the answer.

10. You belong here. Stop waiting for someone to realize you don't.

10 years later, I'm still learning some of these lessons.

What would you tell yourself on your first day?`,
    placeholders: ['age/stage', 'numbered lessons with context'],
    bestFor: ['Mentorship positioning', 'Early-career audience', 'Wisdom sharing'],
    tips: [
      'Each piece of advice should be specific, not generic',
      'Include context that makes each point memorable',
      'Admit you\'re still learning too'
    ]
  },

  // STRUCTURE (11-20)
  {
    id: 'structure-story-arc',
    name: 'The Story Arc',
    category: 'structure',
    description: 'Classic narrative structure: Situation → Struggle → Solution → Success → Lesson',
    pattern: `[Situation - set the scene]

[Struggle - the problem or challenge]

[Decision/turning point]

[Solution - what you did]

[Success - the results with specifics]

[Lesson - the universal takeaway]

[Question]`,
    example: `Last year, I lost my biggest client. They represented 60% of revenue.

The email came on a Tuesday. "We're going a different direction."

I panicked. Genuinely considered shutting down.

For two weeks, I did nothing but stress spiral.

Then I made a decision: I would never let this happen again.

The next 6 months:
→ Built a marketing engine (instead of relying on referrals)
→ Diversified to 12 clients (none more than 15% of revenue)
→ Raised my prices 40% (scarcity creates value perception)
→ Created a recurring revenue offer (predictable income)

Today, I make 2x what I did before losing that client.

The crisis I thought would end me became the catalyst I needed.

Every business has a near-death experience.

The ones that survive don't just recover. They evolve.

What crisis forced you to level up?`,
    placeholders: ['inciting incident', 'emotional response', 'turning point', 'actions taken', 'results', 'lesson'],
    bestFor: ['Founder stories', 'Transformation content', 'Business lessons'],
    tips: [
      'Include the emotional journey, not just the facts',
      'The turning point should feel like a real decision',
      'Results should include specific numbers'
    ]
  },
  {
    id: 'structure-listicle',
    name: 'The Listicle with Depth',
    category: 'structure',
    description: 'Numbered list where each point has 2-3 sentences of context. High value density.',
    pattern: `[Number] [topic] that [took X time/experience to learn]:

1. [Point 1]
[2-3 sentence explanation]

2. [Point 2]
[2-3 sentence explanation]

... (continue for all points)

[Which resonates most?]`,
    example: `8 career lessons that took me 15 years to learn:

1. Your network is your net worth (cliché but true)
The opportunities I'm most proud of came from relationships, not applications. Invest in people before you need them.

2. Titles matter less than problems solved
Nobody cares if you were a "Senior Associate" or "Lead Strategist." They care about the results you drove.

3. Learning to say no is a superpower
Every yes to something unimportant is a no to something that matters. Protect your calendar ruthlessly.

4. Feedback is a gift (even when it stings)
The people willing to tell you hard truths are rare. Thank them, even when your ego wants to argue.

5. Energy management > time management
Not all hours are equal. Know when you do your best work and protect that window.

6. Document everything
The project you led, the process you built, the results you drove. If it's not written down, it didn't happen.

7. Your reputation is your resume
What people say about you when you're not in the room matters more than any credential.

8. Rest is productive
Burnout doesn't make you a hero. It makes you ineffective. Sustainable pace wins the long game.

Which of these resonates most with where you are right now?`,
    placeholders: ['topic', 'number', 'time frame', 'lessons with context'],
    bestFor: ['Expertise sharing', 'Value-packed content', 'Saves and shares'],
    tips: [
      'Each point should stand alone as valuable',
      'Explanations should add real insight, not just repeat the point',
      'Order from most to least impactful, or save best for last'
    ]
  },
  {
    id: 'structure-framework',
    name: 'The Framework Introduction',
    category: 'structure',
    description: 'Introduce a named methodology or framework. Positions you as a thought leader.',
    pattern: `The [content/work/approach] I [create/use] falls into [number] buckets.

I call it the [ACRONYM] Framework:

[Letter 1] - [Word]
[Explanation of this component]

[Letter 2] - [Word]
[Explanation of this component]

[Letter 3] - [Word]
[Explanation of this component]

[What most people get wrong]

[Your recommended balance/approach]

[Results from using this]

[Question]`,
    example: `The content I create falls into 3 buckets.

I call it the ACE Framework:

A - Attract
Content that reaches new people. Broad topics, strong hooks, shareable insights. Goal: Get discovered.

C - Connect
Content that builds relationships. Personal stories, behind-the-scenes, responses to comments. Goal: Earn trust.

E - Expert
Content that showcases depth. Detailed how-tos, frameworks, case studies. Goal: Demonstrate credibility.

Most people only create one type. They either:
→ Chase virality with shallow takes (all Attract)
→ Only talk to existing followers (all Connect)
→ Get too technical for newcomers (all Expert)

The magic is balance.

When I audit my content:
- 40% Attract
- 30% Connect
- 30% Expert

This ratio has 3x my engagement in 6 months.

What does your content mix look like?`,
    placeholders: ['framework name', 'components (3-5)', 'what each does', 'common mistakes', 'ideal ratio'],
    bestFor: ['Thought leadership', 'Original IP', 'Positioning as expert'],
    tips: [
      'The acronym should be memorable and relevant',
      'Each component should be clearly distinct',
      'Show how to apply it practically'
    ]
  },
  {
    id: 'structure-myth-buster',
    name: 'The Myth-Buster',
    category: 'structure',
    description: 'Take a commonly accepted belief and explain why it\'s wrong.',
    pattern: `"[Common belief/advice]"

This advice has [negative outcome].

Here's the truth:

[What's actually true]

[Your experience following the bad advice]

[What changed when you stopped]

[Results]

[Reframe of the original advice]

[Question]`,
    example: `"Just add value and clients will come."

This advice has kept more consultants broke than any other.

Here's the truth:

Value you give away for free is valued like something free.

I spent 2 years:
- Writing free guides
- Offering free strategy calls
- Giving away my best ideas in DMs

My calendar was full. My bank account was empty.

What changed?

I started charging for my time from the first conversation.

Not because I'm greedy. Because:
1. Paying clients take action
2. Free advice creates endless follow-up questions
3. Your time teaches people what you're worth

Want more clients? Don't be more valuable.

Be more clear about the value you provide AND what it costs.

Generosity isn't free work. It's being genuinely helpful while respecting your own boundaries.

What advice have you followed that turned out to be wrong?`,
    placeholders: ['myth/common advice', 'why it fails', 'what actually works', 'your experience'],
    bestFor: ['Contrarian positioning', 'Expertise demonstration', 'Engagement'],
    tips: [
      'Choose a belief that many people hold',
      'Provide evidence from your own experience',
      'The truth should be actionable, not just "it depends"'
    ]
  },
  {
    id: 'structure-before-after',
    name: 'The Before/After',
    category: 'structure',
    description: 'Contrast past and present states in parallel structure. Shows transformation clearly.',
    pattern: `My [topic] in [past year]:
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]
- [Bullet 4]
- [Bullet 5]

My [topic] in [current year]:
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]
- [Bullet 4]
- [Bullet 5]

The difference isn't [what people think]. It's [actual insight].

[Key changes that made it possible]

[Takeaway/lesson]

[Question]`,
    example: `My mornings in 2019:
- Wake up to 47 unread emails
- Check Slack before getting out of bed
- Skip breakfast, straight to meetings
- First deep work at 3pm (if lucky)
- End day feeling busy but unproductive

My mornings in 2024:
- Phone stays off until 9am
- 90 minutes of deep work before anything else
- Meetings start at 10:30am earliest
- Email twice per day (batch processing)
- End day with top priorities actually completed

The difference isn't discipline. It's design.

I didn't become a better person. I built a better system.

3 changes that made this possible:

1. Airplane mode from 9pm to 9am (non-negotiable)
2. Calendar audit every Friday (protect deep work blocks)
3. Morning routine for brain, not inbox (my priorities first)

You don't rise to the level of your goals. You fall to the level of your systems.

What's one system change that transformed your productivity?`,
    placeholders: ['before details', 'after details', 'key changes', 'lesson'],
    bestFor: ['Transformation stories', 'Productivity content', 'Practical advice'],
    tips: [
      'Use parallel structure for easy comparison',
      'Be specific with details in both states',
      'The changes should be replicable by others'
    ]
  },
  {
    id: 'structure-tutorial',
    name: 'The Step-by-Step Tutorial',
    category: 'structure',
    description: 'Practical how-to with specific steps and timing. High save rate.',
    pattern: `How I [achieve X] in [timeframe] ([system name]):

Step 1: [Step name] ([time])
[Detailed explanation of what to do]

Step 2: [Step name] ([time])
[Detailed explanation]

Step 3: [Step name] ([time])
[Detailed explanation]

... (continue steps)

[Results from using this system]

[Final insight]

[Question]`,
    example: `How I research any company before an interview (30-minute system):

Step 1: Leadership LinkedIn (10 min)
Look up CEO, your future manager, and peers. What are they posting about? What seems to matter to them? Note specific phrases they use.

Step 2: Recent News (5 min)
Google "[Company] news" filtered to last month. What are they celebrating? What challenges are they facing publicly?

Step 3: Glassdoor Themes (5 min)
Don't read for specific grievances. Read for patterns. What do multiple reviews mention as a strength? A weakness?

Step 4: Competitors (5 min)
Who are they competing with? What's their positioning? How might that affect the role you're applying for?

Step 5: Prepare 3 Questions (5 min)
Based on your research, write 3 thoughtful questions that prove you did your homework. Not "where do you see the company in 5 years" but "I noticed you recently expanded into X market—how has that shifted priorities for this team?"

This system has helped me convert 80% of interviews into offers.

Preparation isn't just about having answers. It's about asking questions they don't expect.

What's your interview prep ritual?`,
    placeholders: ['goal', 'timeframe', 'numbered steps with timing', 'results', 'insight'],
    bestFor: ['Practical value', 'High save rate', 'Establishing expertise'],
    tips: [
      'Include specific timing for each step',
      'Make steps concrete and actionable',
      'Share your actual results to prove it works'
    ]
  },
  {
    id: 'structure-comparison',
    name: 'The Comparison',
    category: 'structure',
    description: 'Compare two approaches side by side to help readers choose.',
    pattern: `[Group/topic] fall into two camps:

The [Type A]:
- [Characteristic 1]
- [Characteristic 2]
- [Characteristic 3]
- Goal: [Their goal]

The [Type B]:
- [Characteristic 1]
- [Characteristic 2]
- [Characteristic 3]
- Goal: [Their goal]

Neither is wrong. But [insight about choice].

[Type A] get [result].
[Type B] get [result].

[Your recommendation based on goals]

[Your personal journey/choice]

[Question]`,
    example: `LinkedIn creators fall into two camps:

The Broadcasters:
- Post daily
- One-to-many content
- Optimize for impressions
- Goal: Reach

The Connectors:
- Post 2-3x per week
- Spend more time commenting
- Optimize for conversations
- Goal: Relationships

Neither is wrong. But most people do one without realizing they're choosing.

Broadcasters build audiences faster.
Connectors build trust deeper.

Broadcasters get more leads.
Connectors close more deals.

What's your goal?

If you want to be known: broadcast more.
If you want to be trusted: connect more.

I spent 2 years broadcasting before realizing my business is built on connection. Now I do 60% connecting, 40% broadcasting.

My engagement dropped. My revenue doubled.

What's your current ratio?`,
    placeholders: ['approach A', 'approach B', 'characteristics of each', 'tradeoffs', 'recommendation'],
    bestFor: ['Strategic thinking', 'Nuanced takes', 'Helping people decide'],
    tips: [
      'Present both sides fairly',
      'The insight should help readers self-select',
      'Share your personal choice and why'
    ]
  },
  {
    id: 'structure-prediction',
    name: 'The Prediction',
    category: 'structure',
    description: 'Share your view of how something will change in the future.',
    pattern: `In [timeframe], [prediction].

Here's why:

1. [Evidence/trend 1]
2. [Evidence/trend 2]
3. [Evidence/trend 3]

What will replace it?

[Your answer]

The sequence will flip:
- OLD: [Old way]
- NEW: [New way]

[What this means for the reader]

[What you're doing to prepare]

[Question]`,
    example: `In 3 years, cold outreach will be nearly useless.

Here's why:

1. Everyone has AI writing their cold emails now
2. Inboxes are flooded—response rates are already plummeting
3. Decision-makers are exhausted and suspicious

What will replace it?

Warm outreach through content.

The sequence will flip:
- OLD: Cold email → Nurture → Trust → Sale
- NEW: Content → Trust → Warm outreach → Sale

The people buying from you will already know you before you ever contact them.

They'll have read your posts. Seen your comments. Maybe attended your webinar.

By the time you reach out, you're not a stranger. You're a familiar face.

This is why I'm investing heavily in content now.

Not because it works today (though it does).
Because it's the only game that will work in 2027.

What are you doing now to prepare for how buying is changing?`,
    placeholders: ['prediction', 'evidence/reasoning', 'what replaces it', 'action to take'],
    bestFor: ['Thought leadership', 'Forward-thinking positioning', 'Sparking discussion'],
    tips: [
      'Be specific about the timeframe',
      'Back up predictions with observable trends',
      'Include what you\'re personally doing about it'
    ]
  },
  {
    id: 'structure-case-study',
    name: 'The Case Study',
    category: 'structure',
    description: 'Real example with specific numbers and outcomes. Highest credibility.',
    pattern: `[Client/project situation with specifics].

The problem:
[Detailed description of the challenge]

Here's what we changed:

[Change 1]: [Before] → [After]
[Change 2]: [Before] → [After]
[Change 3]: [Before] → [After]
[Change 4]: [Before] → [After]

Results after [timeframe]:
- [Metric 1]: [Before] → [After]
- [Metric 2]: [Before] → [After]
- [Metric 3]: [Before] → [After]
- [Metric 4]: [Before] → [After]

[Key insight]

[Broader lesson]

[Question]`,
    example: `One of my clients was burning $40K/month on LinkedIn ads. Getting leads. Closing almost none.

The problem wasn't the ads. It was the follow-up.

Leads came in hot and went cold within 48 hours. Sales team was reaching out a week later with generic templates.

Here's what we changed:

Response Time: Week → Same day (ideally within 2 hours)

First Touch: Generic pitch → Personalized message referencing their specific ad engagement

Nurture Sequence: Nothing → 5-touch sequence mixing value and soft asks

Lead Scoring: None → Prioritized leads by engagement level and company size

Results after 90 days:
- Lead-to-meeting rate: 3% → 14%
- Cost per meeting: $890 → $210
- Monthly revenue from channel: $12K → $67K

Same ad spend. Same leads. Different system.

Most conversion problems aren't at the top of the funnel. They're in the middle.

What's one thing in your sales process you've optimized recently?`,
    placeholders: ['situation', 'problem', 'changes made', 'specific results', 'lesson'],
    bestFor: ['B2B content', 'Demonstrating expertise', 'Attracting clients'],
    tips: [
      'Use real numbers (anonymize if needed)',
      'Show the before and after clearly',
      'Focus on changes others can replicate'
    ]
  },
  {
    id: 'structure-quote-expansion',
    name: 'The Quote Expansion',
    category: 'structure',
    description: 'Take a famous quote and add your unique interpretation and application.',
    pattern: `"[Quote]" - [Attribution]

This quote lives rent-free in my head.

[Context of when you first encountered it or why it resonates]

[Story of how you used to think/act differently]

[The turning point]

[How you now apply this quote]

[Results or changes from this new approach]

[What you want readers to take away]

[Question]`,
    example: `"You can do anything, but not everything." - David Allen

This quote lives rent-free in my head.

Early in my career, I wore "busy" as a badge of honor.

100 tabs open. 5 projects running. Always available. Never present.

I thought I was being dedicated. I was being scattered.

The turning point came when my manager said: "I can't tell what you're actually working on."

Neither could I.

Now I follow a rule: 3 priorities max. At any time, I can tell you exactly what they are.

Everything else is maintenance or it's delegated or it's a no.

This means I disappoint people. I say no to interesting opportunities. I leave good ideas on the table.

But the things I do commit to? They get my full attention.

And it turns out, 3 things done excellently beats 10 things done adequately.

What's one thing you need to remove from your plate this week?`,
    placeholders: ['quote', 'attribution', 'personal connection', 'application', 'call to action'],
    bestFor: ['Reflection', 'Adding credibility', 'Philosophical content'],
    tips: [
      'Choose quotes that aren\'t overused',
      'Add genuine personal insight, not just paraphrasing',
      'Connect to a specific behavioral change'
    ]
  },

  // ENGAGEMENT (21-25)
  {
    id: 'engagement-question-close',
    name: 'The Question Close',
    category: 'engagement',
    description: 'End with an open-ended question that invites personal responses.',
    pattern: `[Content body]

[Open-ended question inviting personal response]`,
    example: `[Your post content goes here]

What's one thing you'd add to this list?

---

Alternative closing questions:
• "Have you experienced something similar?"
• "What's your take—agree or disagree?"
• "How would you handle this situation?"
• "What's worked for you?"
• "I'd love to hear your perspective. What would you do differently?"
• "Which of these resonates most with you right now?"
• "What would you add?"`,
    placeholders: ['content body', 'question'],
    bestFor: ['Driving comments', 'Starting discussions', 'Building community'],
    tips: [
      'Questions should invite personal stories, not yes/no answers',
      'Make it easy to answer (not too complex)',
      'Respond to comments to keep the conversation going'
    ]
  },
  {
    id: 'engagement-challenge',
    name: 'The Challenge',
    category: 'engagement',
    description: 'End with a specific actionable challenge with a timeframe.',
    pattern: `[Content body]

[Specific challenge with timeframe]`,
    example: `[Your post content goes here]

Your challenge: Try this for one week and report back.

---

Alternative challenge closings:
• "I dare you to try this in your next meeting."
• "Test this approach with 5 people and tell me if I'm wrong."
• "Start today: [specific action]. Let me know how it goes."
• "Do this before Friday and share what happens."
• "Try it once. If it doesn't work, you can always go back."`,
    placeholders: ['content body', 'challenge with timeframe'],
    bestFor: ['Practical content', 'Inspiring action', 'Follow-up engagement'],
    tips: [
      'Make the challenge specific and achievable',
      'Include a clear timeframe',
      'Ask people to share their results (creates future content)'
    ]
  },
  {
    id: 'engagement-resource-offer',
    name: 'The Resource Offer',
    category: 'engagement',
    description: 'Offer to share a template or resource in exchange for engagement.',
    pattern: `[Content body]

[Offer to share resource for engagement]`,
    example: `[Your post content goes here]

I've turned this into a template. Comment 'template' and I'll send it.

---

Alternative resource offers:
• "Want the full breakdown? Comment 'guide' below."
• "I made a checklist for this. Drop a 🔥 if you want it."
• "I'll share my exact system in the comments for anyone interested."
• "Reply 'send' and I'll DM you the template I use."
• "Comment 'yes' and I'll send you the full framework."

Important: Make sure you actually have the resource ready before posting!`,
    placeholders: ['content body', 'resource offer'],
    bestFor: ['Lead generation', 'List building', 'High engagement'],
    tips: [
      'Actually have the resource ready before posting',
      'Make the resource genuinely valuable',
      'Use this sparingly—overuse feels spammy'
    ]
  },
  {
    id: 'engagement-vulnerable-ask',
    name: 'The Vulnerable Ask',
    category: 'engagement',
    description: 'End with an honest question that invites shared experience.',
    pattern: `[Content body]

[Honest question inviting shared experience]`,
    example: `[Your post content goes here]

Am I the only one who struggles with this?

---

Alternative vulnerable asks:
• "Tell me I'm not alone in this."
• "Has anyone else felt this way?"
• "Is this just me, or is this a universal experience?"
• "I can't be the only one. Right?"
• "Anyone else deal with this?"
• "Please tell me others have experienced this too."`,
    placeholders: ['content body', 'vulnerable question'],
    bestFor: ['Building connection', 'Relatability', 'Creating safe space'],
    tips: [
      'Vulnerability should feel genuine, not manipulative',
      'Works best with genuinely relatable content',
      'Respond warmly to people who share'
    ]
  },
  {
    id: 'engagement-hot-take',
    name: 'The Hot Take Stance',
    category: 'engagement',
    description: 'End with a polarizing statement that invites debate.',
    pattern: `[Content body]

[Polarizing statement inviting debate]`,
    example: `[Your post content goes here]

Unpopular opinion. Fight me in the comments.

---

Alternative hot take closings:
• "Agree or disagree? I'm ready for the debate."
• "This might be controversial, but I'm standing by it."
• "Tell me why I'm wrong."
• "Hot take or common sense? You decide."
• "Change my mind."
• "Roast me if you disagree."`,
    placeholders: ['content body', 'polarizing statement'],
    bestFor: ['Boosting engagement', 'Algorithm boost (comments count more)', 'Bold positioning'],
    tips: [
      'Only use if you can actually defend your position',
      'Engage respectfully with those who disagree',
      'Don\'t be contrarian just for engagement—have a real point'
    ]
  },

  // COMPLETE (26-30)
  {
    id: 'complete-weekly-insight',
    name: 'The Weekly Insight',
    category: 'complete',
    description: 'Share one thing you learned this week. Great for consistent posting.',
    pattern: `One thing I learned this week:

[Lesson/insight]

[Story or context that led to this learning]

[Why this matters]

[How you'll apply it going forward]

[Question for audience]`,
    example: `One thing I learned this week:

Speed of implementation > perfection of plan.

I've been sitting on a project idea for 3 months. Waiting for the "right" moment. The perfect plan. More research.

On Monday, I gave myself 48 hours to ship v1.

It's ugly. It's incomplete. It's live.

And I've already learned more from 10 users than I did from 3 months of planning.

Analysis paralysis is real, and it masquerades as preparation.

Sometimes you need to ship the rough draft just to see what the second draft should be.

What have you been "perfecting" that you should just ship?`,
    placeholders: ['lesson', 'story context', 'realization', 'question'],
    bestFor: ['Weekly content rhythm', 'Authentic sharing', 'Relatability'],
    tips: [
      'Keep it to one clear insight',
      'Include the specific context that triggered the learning',
      'Make it applicable to others'
    ]
  },
  {
    id: 'complete-counterintuitive',
    name: 'The Counterintuitive Truth',
    category: 'complete',
    description: 'Explain why pursuing something directly backfires, and what to do instead.',
    pattern: `Stop trying to [be/achieve X].

[Wait, hear me out/Let me explain]

When I tried to [do X], I:
- [Negative outcome 1]
- [Negative outcome 2]
- [Negative outcome 3]

And the result? [Ironic outcome]

The shift:

I stopped trying to [be X].
I started trying to [be Y].

[Why Y works better than X]

Counterintuitively, when I stopped [optimizing for X], [X improved anyway].

[Insight about why this works]

[Question]`,
    example: `Stop trying to be likable at work.

Wait, hear me out.

When I tried to be likable, I:
- Agreed when I should have pushed back
- Avoided hard conversations
- Prioritized harmony over honesty

And the result? I was liked. But not respected. Not promoted.

The shift:

I stopped trying to be the person everyone likes.
I started trying to be the person everyone trusts.

Trust comes from:
→ Saying the hard thing in the room
→ Being consistent (even when it's inconvenient)
→ Giving feedback directly (not through gossip)
→ Having opinions and defending them

Likable is agreeable. Trustworthy is reliable.

Likable gets you invited to happy hour. Trustworthy gets you invited to the strategy meeting.

Counterintuitively, when I stopped optimizing for likable, I became more liked anyway.

People respect authenticity, even when they disagree.

Are you optimizing for liked or trusted?`,
    placeholders: ['common goal', 'how it backfires', 'alternative approach', 'reframe'],
    bestFor: ['Contrarian content', 'Career advice', 'Mindset shifts'],
    tips: [
      'The counterintuitive truth should be genuinely surprising',
      'Explain the mechanism of why it works',
      'Include your personal experience as proof'
    ]
  },
  {
    id: 'complete-underrated-overrated',
    name: 'The Underrated/Overrated',
    category: 'complete',
    description: 'List what\'s overrated and underrated in your field. Drives discussion.',
    pattern: `[Topic]: What's underrated vs overrated.

OVERRATED:

[Item 1]
[Brief explanation]

[Item 2]
[Brief explanation]

[Item 3]
[Brief explanation]

UNDERRATED:

[Item 1]
[Brief explanation]

[Item 2]
[Brief explanation]

[Item 3]
[Brief explanation]

... (continue as needed)

What would you add to either list?`,
    example: `Career advice: What's underrated vs overrated.

OVERRATED:

"Follow your passion"
Most people don't know their passion until they've built skills. Get good at something first.

"Always be networking"
Forced networking is exhausting. Build real relationships with people you genuinely like.

"Hustle culture"
Working 80 hours won't make you more successful. It'll make you burnt out.

UNDERRATED:

Taking breaks
Some of my best ideas come after stepping away. Rest is productive.

Asking for help
Most people want to help. They just need to be asked.

Saying "I don't know"
It's not weakness. It's honesty. People trust it more than BS answers.

Writing things down
Your brain is for having ideas, not storing them. Capture everything.

Managing your energy
Not all hours are equal. Protect your peak performance windows.

What would you add to either list?`,
    placeholders: ['topic', 'overrated items with takes', 'underrated items with takes'],
    bestFor: ['Engagement', 'Showing perspective', 'Versatile format'],
    tips: [
      'Include takes that might be controversial',
      'Brief explanations make each point memorable',
      'Invite additions to drive comments'
    ]
  },
  {
    id: 'complete-appreciation',
    name: 'The Appreciation Post',
    category: 'complete',
    description: 'Thank someone who impacted you, but make it about the lesson, not just the praise.',
    pattern: `[Person or group] changed [my career/my perspective/everything] with [one action/conversation/approach].

[Specific incident or context]

[What they said or did - be specific]

[Impact it had on you]

[The lesson you took from it]

[How you apply it now]

[Question for audience]`,
    example: `A manager I had in 2018 changed my career trajectory with one conversation.

I'd just messed up a client presentation. Badly. Forgot a key slide, stumbled through questions, lost the room.

I walked out ready to spiral.

She pulled me aside and said:

"That was rough. It's also not as big a deal as you think it is. Here's what I noticed you did well. Here's what you'll do differently. Now let's get coffee and talk about something else."

No shame spiral. No catastrophizing. Just clear feedback and forward motion.

That approach taught me how to handle failure:

1. Name it (don't pretend it didn't happen)
2. Shrink it (keep perspective)
3. Learn from it (specific adjustments)
4. Move on (don't marinate in it)

I use this framework constantly now.

The best managers don't protect you from failure. They teach you how to recover from it.

Who shaped how you handle setbacks?`,
    placeholders: ['who', 'specific incident', 'what they did', 'lesson learned', 'question'],
    bestFor: ['Gratitude content', 'Leadership lessons', 'Relationship building'],
    tips: [
      'Focus on a specific moment, not general praise',
      'Extract a lesson others can apply',
      'Tag the person if appropriate (they may engage)'
    ]
  },
  {
    id: 'complete-things-i-dont-do',
    name: 'The Things I Don\'t Do',
    category: 'complete',
    description: 'Share boundaries and anti-habits. Shows self-awareness and gives permission to others.',
    pattern: `Things I [stopped doing/don't do] in my [career/life/business] (and should have stopped earlier):

1. [Thing stopped]
[Brief context of what you used to do and why you stopped]

2. [Thing stopped]
[Brief context]

3. [Thing stopped]
[Brief context]

... (continue for 5-7 items)

These changes didn't hold me back. They [positive outcome].

[Closing insight]

[Question]`,
    example: `Things I stopped doing in my career (and should have stopped earlier):

1. Eating lunch at my desk
Every day. No breaks. I thought it made me look dedicated. It made me burned out.

2. Saying "let me check my calendar" when I meant "no"
Just say no. Everyone knows what "let me check" really means.

3. Apologizing before sharing ideas
"Sorry, this might be a dumb question but..." Just ask the question. It's not dumb.

4. Responding to Slack immediately
Training people to expect instant responses trains you to never do deep work.

5. Attending meetings without agendas
No agenda = no meeting. My time isn't for "let's sync up."

6. Comparing my progress to others publicly
The only comparison that matters is: am I better than I was last year?

7. Working when sick
Hero culture is toxic. Rest when you're sick. Come back when you're healthy.

These changes didn't hold me back. They made me more effective.

Boundaries aren't limits. They're performance optimizers.

What did you stop doing that improved your work?`,
    placeholders: ['things stopped', 'what you thought before', 'what you know now'],
    bestFor: ['Relatable content', 'Boundary-setting', 'Practical advice'],
    tips: [
      'Include things many people still do',
      'Explain the old thinking vs. new thinking',
      'Frame boundaries as empowering, not restrictive'
    ]
  }
];

export const getTemplatesByCategory = (category: Template['category']) => {
  return templates.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return templates.find(t => t.id === id);
};

export const templateCategories = [
  { id: 'hook', name: 'Hooks', description: 'Strong opening lines that stop the scroll', count: 10 },
  { id: 'structure', name: 'Structures', description: 'Proven frameworks for the post body', count: 10 },
  { id: 'engagement', name: 'Engagement', description: 'Closers that drive comments', count: 5 },
  { id: 'complete', name: 'Complete', description: 'Full post templates ready to use', count: 5 },
] as const;
