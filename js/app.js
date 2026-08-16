/* ============ helpers ============ */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const IMG={hero:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/1c7444a14-5e81-4486-a254-4e403d83ae7a.png',lab:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/17cfb0d2f-98ec-494a-bdb6-13cb8d8a1f02.png',review:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/14d85471c-5a92-4be7-870e-b6d863de975c.png',clinic:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/136faa027-b7c5-4bf2-8062-456f88416f1b.png',sleep:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/172f59cad-aaa3-4452-90b6-fd2105fdba30.png',trends:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/1cfd7ec10-f8fe-4779-a819-59a32ddd621c.png',chen:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/1ae7fe3cd-c9b7-4d40-b646-5594f005a0b3.png',team:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/12d6728ba-120e-47e2-9b78-58980c320d95.png',app:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/1b418d7dc-e990-45bf-b71d-87ba2f2a1a32.png',arch:'https://image.qwenlm.ai/public_source/7637572c-d144-4114-a6a2-f9cc0b63eeaf/1a2428047-9d53-4e27-8505-bc03b952b79f.png'};
const AR='<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

/* ============ data ============ */
const RESULTS=[
 {id:'vitd',name:'Vitamin D',cat:'Nutrients',display:'34',unit:'ng/mL',ref:[20,50],refText:'20–50 ng/mL',status:'ok',statusText:'Within reference range',date:'Aug 8, 2026',trend:'Stable',series:[26,28,30,31,33,34],dates:['Feb 25','Aug 25','Dec 25','Mar 26','Jun 26','Aug 26'],measure:'Vitamin D reflects sunlight exposure and nutrition, and supports bone, muscle and immune function.',context:'Your result sits within the provided reference range and has drifted gently upward across recent measurements.',questions:['Is my current level sufficient for the winter months?','When would it make sense to retest?']},
 {id:'glucose',name:'Fasting glucose',cat:'Metabolic',display:'92',unit:'mg/dL',ref:[70,99],refText:'70–99 mg/dL',status:'ok',statusText:'Within expected range',date:'Aug 8, 2026',trend:'Stable',series:[95,94,93,92,93,92],dates:['Aug 25','Nov 25','Feb 26','Apr 26','Jun 26','Aug 26'],measure:'Fasting glucose shows how your body is managing blood sugar after an overnight fast.',context:'Values have remained steady within the expected range across the past year.',questions:['How do my trends compare year over year?']},
 {id:'hba1c',name:'HbA1c',cat:'Metabolic',display:'5.3',unit:'%',ref:[4,5.6],refText:'4.0–5.6 %',status:'ok',statusText:'Within expected range',date:'Aug 8, 2026',trend:'Gradually improving',series:[5.6,5.5,5.5,5.4,5.3],dates:['Aug 25','Feb 26','Apr 26','Jun 26','Aug 26'],measure:'HbA1c estimates your average blood sugar over roughly three months.',context:'A gentle downward trend, consistent with your recent activity and sleep changes.',questions:['Should we keep the current follow-up cadence?']},
 {id:'bp',name:'Blood pressure',cat:'Blood',display:'118/76',unit:'mmHg',refText:'Below 120/80 mmHg',status:'ok',statusText:'Within expected range',date:'Aug 8, 2026',trend:'Stable',series:[122,120,121,119,118],dates:['Apr 26','May 26','Jun 26','Jul 26','Aug 26'],measure:'Blood pressure describes the force of blood against artery walls.',context:'Recent readings cluster comfortably below the 120/80 threshold.',questions:['Any changes you would suggest to maintain this?']},
 {id:'rhr',name:'Resting heart rate',cat:'Blood',display:'62',unit:'bpm',ref:[60,100],refText:'60–100 bpm',status:'ok',statusText:'Within expected range',date:'Aug 8, 2026',trend:'Gradually decreasing',series:[66,65,64,63,62,62],dates:['Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26'],measure:'Resting heart rate can reflect cardiovascular fitness and recovery.',context:'A slow, steady decline over six weeks — often associated with improved fitness and sleep.',questions:['Is this trend consistent with my activity changes?']},
 {id:'chol',name:'Total cholesterol',cat:'Blood',display:'189',unit:'mg/dL',refText:'Below 200 mg/dL',status:'ok',statusText:'Within expected range',date:'Feb 12, 2026',trend:'Stable',series:[196,192,190,189],dates:['Aug 25','Nov 25','Dec 25','Feb 26'],measure:'Total cholesterol summarizes several lipoprotein particles in your blood.',context:'Stable and below the desirable threshold at last measurement.',questions:['Would a fuller lipid breakdown be useful next time?']},
 {id:'ferritin',name:'Ferritin',cat:'Nutrients',display:'24',unit:'ng/mL',ref:[30,300],refText:'30–300 ng/mL',status:'attention',statusText:'Slightly below range',date:'Aug 8, 2026',trend:'Declining slightly',series:[34,31,29,26,24],dates:['Aug 25','Feb 26','Apr 26','Jun 26','Aug 26'],measure:'Ferritin reflects your body\u2019s stored iron.',context:'Your result is slightly below the provided range and has drifted downward. This is common and often manageable, but may be worth discussing with your clinician.',questions:['Could this explain my lower energy some weeks?','Should we discuss dietary changes or supplementation?','When should this be retested?']},
 {id:'b12',name:'Vitamin B12',cat:'Nutrients',display:'412',unit:'pg/mL',ref:[200,900],refText:'200–900 pg/mL',status:'ok',statusText:'Within reference range',date:'Feb 12, 2026',trend:'Stable',series:[380,395,400,412],dates:['Aug 25','Nov 25','Dec 25','Feb 26'],measure:'B12 supports nerve function and red blood cell formation.',context:'Comfortably within range at last measurement.',questions:[]},
 {id:'tsh',name:'TSH',cat:'Hormones',display:'2.1',unit:'mIU/L',ref:[0.4,4],refText:'0.4–4.0 mIU/L',status:'ok',statusText:'Within reference range',date:'Feb 12, 2026',trend:'Stable',series:[2.4,2.3,2.2,2.1],dates:['Aug 25','Nov 25','Dec 25','Feb 26'],measure:'TSH is a screening marker of thyroid function.',context:'Stable and mid-range at last measurement.',questions:[]},
 {id:'cortisol',name:'Cortisol (AM)',cat:'Hormones',display:'11.2',unit:'\u00B5g/dL',ref:[6,18],refText:'6–18 \u00B5g/dL',status:'ok',statusText:'Within reference range',date:'Feb 12, 2026',trend:'Stable',series:[12.5,11.8,11.4,11.2],dates:['Aug 25','Nov 25','Dec 25','Feb 26'],measure:'Morning cortisol is one signal of stress-response and recovery rhythms.',context:'Within range, with a gentle settling trend.',questions:[]},
 {id:'sleep',name:'Sleep duration (avg)',cat:'Other',display:'6h 48m',unit:'per night',refText:'7–9h suggested',status:'attention',statusText:'Needs attention',date:'Week of Aug 24, 2026',trend:'Improving',series:[6.1,6.2,6.4,6.5,6.7,6.8],dates:['Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26'],measure:'Average sleep duration across tracked nights.',context:'Average duration is below the suggested 7–9 hours, though it has increased by about 42 minutes over the last month.',questions:['Which factors most influence my shorter nights?']},
 {id:'crp',name:'hs-CRP',cat:'Other',display:'1.1',unit:'mg/L',refText:'Below 3.0 mg/L',status:'ok',statusText:'Within expected range',date:'Feb 12, 2026',trend:'Stable',series:[1.6,1.4,1.3,1.1],dates:['Aug 25','Nov 25','Dec 25','Feb 26'],measure:'hs-CRP is a general marker of inflammation.',context:'Low and gently declining at last measurement.',questions:[]}];
const OVERVIEW=[
 {cat:'Metabolic health',status:'ok',label:'Within expected range',why:'Glucose and HbA1c are within the provided ranges and trending steadily.'},
 {cat:'Sleep',status:'warn',label:'Needs attention',why:'Average duration is below your suggested range, but improving over the last month.'},
 {cat:'Vitamin status',status:'warn',label:'Review recommended',why:'Vitamin D is within range; ferritin is slightly below. A review with your clinician may be useful.'},
 {cat:'Heart health',status:'ok',label:'Within expected range',why:'Blood pressure and resting heart rate have remained stable.'}];
const INSIGHTS=[
 {t:'Your sleep duration has increased by 42 minutes over the last month.',why:'Consistent bedtimes and your Better Sleep routines may be contributing.',next:'Continue your current wind-down routine and keep tracking weekday sleep.'},
 {t:'Your resting heart rate has remained stable over the last six weeks.',why:'A stable resting heart rate can reflect a steady balance of activity and recovery.',next:'No action needed \u2014 continue your usual activity.'},
 {t:'Your latest vitamin D result is within the provided reference range.',why:'Vitamin D supports bone, muscle and immune function; yours has been stable.',next:'Consider discussing whether to retest during winter months.'}];
const PROGRAMS=[
 {id:'better-sleep',name:'Better Sleep',weeks:'4 weeks',focus:'Sleep quality & routine',progress:62,expert:'Dr. Elena Petrova',desc:'A structured program designed to help you understand and improve your sleep habits.',weeksPlan:[{n:'Week 1',t:'Baseline',d:'Understand your current patterns and set a consistent wake anchor.'},{n:'Week 2',t:'Routine',d:'Build a wind-down sequence and light habits.'},{n:'Week 3',t:'Optimization',d:'Fine-tune environment, timing and caffeine.'},{n:'Week 4',t:'Review',d:'Review trends with your coach and plan ahead.'}],incl:['Education','Daily actions','Tracking','Expert check-ins']},
 {id:'metabolic',name:'Metabolic Foundations',weeks:'8 weeks',focus:'Glucose, energy & habits',progress:25,expert:'Dr. Amara Okafor',desc:'Practical habits for steady energy, informed by your metabolic results.',weeksPlan:[{n:'Weeks 1\u20132',t:'Baseline',d:'Understand your glucose responses.'},{n:'Weeks 3\u20134',t:'Routine',d:'Meal structure and movement breaks.'},{n:'Weeks 5\u20136',t:'Optimization',d:'Protein, fiber and timing.'},{n:'Weeks 7\u20138',t:'Review',d:'Compare trends and set a maintenance plan.'}],incl:['Education','Daily actions','Tracking','Expert check-ins']},
 {id:'heart',name:'Heart Health',weeks:'6 weeks',focus:'Cardiovascular habits',progress:0,expert:'Dr. Maya Chen',desc:'Small, sustainable changes that support long-term cardiovascular wellbeing.',weeksPlan:[{n:'Weeks 1\u20132',t:'Baseline',d:'Know your numbers and rhythms.'},{n:'Weeks 3\u20134',t:'Routine',d:'Zone-2 movement and recovery.'},{n:'Week 5',t:'Optimization',d:'Sleep and stress interplay.'},{n:'Week 6',t:'Review',d:'Review with your clinician.'}],incl:['Education','Daily actions','Tracking','Expert check-ins']},
 {id:'stress',name:'Stress & Recovery',weeks:'4 weeks',focus:'Resilience & rest',progress:0,expert:'Program coach',desc:'Gentle practices to understand your stress signals and recover deliberately.',weeksPlan:[{n:'Week 1',t:'Baseline',d:'Notice your signals.'},{n:'Week 2',t:'Routine',d:'Breathing and breaks.'},{n:'Week 3',t:'Optimization',d:'Boundaries and evenings.'},{n:'Week 4',t:'Review',d:'Keep what works.'}],incl:['Education','Daily actions','Tracking','Expert check-ins']},
 {id:'nutrition',name:'Nutrition',weeks:'6 weeks',focus:'Everyday eating patterns',progress:100,expert:'Jonas Weber, RD',desc:'A practical look at your eating patterns \u2014 no restriction, no noise.',weeksPlan:[{n:'Weeks 1\u20132',t:'Baseline',d:'Observe without changing.'},{n:'Weeks 3\u20134',t:'Routine',d:'Protein and fiber first.'},{n:'Week 5',t:'Optimization',d:'Hydration and timing.'},{n:'Week 6',t:'Review',d:'Sustainable defaults.'}],incl:['Education','Daily actions','Tracking','Expert check-ins']},
 {id:'aging',name:'Healthy Aging',weeks:'8 weeks',focus:'Strength, mobility & prevention',progress:0,expert:'Dr. Maya Chen',desc:'Evidence-informed habits for strength, mobility and long-term prevention.',weeksPlan:[{n:'Weeks 1\u20132',t:'Baseline',d:'Strength and mobility screen.'},{n:'Weeks 3\u20134',t:'Routine',d:'Progressive resistance basics.'},{n:'Weeks 5\u20136',t:'Optimization',d:'Balance and bone loading.'},{n:'Weeks 7\u20138',t:'Review',d:'Long-term plan.'}],incl:['Education','Daily actions','Tracking','Expert check-ins']}];
const CLINICIANS=[
 {id:'maya-chen',name:'Dr. Maya Chen',role:'Preventive Medicine',img:IMG.chen,edu:'MD, Johns Hopkins School of Medicine \u00B7 Board-certified, Preventive Medicine',spec:['Preventive consultations','Cardiovascular risk','Lifestyle medicine','Long-term health planning'],exp:'12 years in preventive and lifestyle medicine',lang:['English','Mandarin'],avail:['Tue','Thu','Fri']},
 {id:'amara-okafor',name:'Dr. Amara Okafor',role:'Endocrinology & Metabolic Health',img:null,edu:'MD, University of Lagos \u00B7 Fellowship, Endocrinology',spec:['Metabolic health','Glucose regulation','Thyroid screening'],exp:'10 years in metabolic medicine',lang:['English','Igbo'],avail:['Mon','Wed']},
 {id:'elena-petrova',name:'Dr. Elena Petrova',role:'Sleep Medicine',img:null,edu:'MD, Charles University \u00B7 Board-certified, Sleep Medicine',spec:['Sleep behavior','Circadian routines','Insomnia (CBT-I informed)'],exp:'9 years in sleep medicine',lang:['English','Czech','Russian'],avail:['Mon','Tue','Thu']},
 {id:'jonas-weber',name:'Jonas Weber, RD',role:'Registered Dietitian \u00B7 Nutrition',img:null,edu:'MSc Nutrition, University of Vienna',spec:['Everyday nutrition','Metabolic diets','Sustainable habits'],exp:'8 years of clinical nutrition practice',lang:['English','German'],avail:['Wed','Fri']}];
const CLINICS=[
 {id:'soma',name:'ORA Clinic \u2014 SoMa',addr:'410 Townsend St, San Francisco, CA',dist:1.2,svc:['Diagnostics','Consultations','Sleep program'],hours:'Mon\u2013Fri 7:30\u201318:00 \u00B7 Sat 8:00\u201313:00',avail:'Next slot today 15:15',pin:[30,62]},
 {id:'brooklyn',name:'ORA Studio \u2014 Brooklyn',addr:'88 Wythe Ave, Brooklyn, NY',dist:3.4,svc:['Diagnostics','Consultations','Nutrition'],hours:'Mon\u2013Fri 8:00\u201318:00',avail:'Next slot tomorrow 9:00',pin:[68,34]},
 {id:'austin',name:'ORA House \u2014 Austin',addr:'1204 S Congress Ave, Austin, TX',dist:6.1,svc:['Diagnostics','Sleep program'],hours:'Tue\u2013Sat 8:00\u201317:00',avail:'Next slot Thu 10:30',pin:[52,78]}];
const ARTICLES=[
 {id:'trends',cat:'Diagnostics',title:'Why trends matter more than a single number',author:'ORA Clinical Team',date:'Aug 26, 2026',read:'6 min',img:IMG.trends,alt:'Printed charts beside a cup of tea',body:[
  {t:'p',c:'When a lab result arrives, the first thing most people look at is the number. The second is the flag \u2014 the quiet little indicator that says whether the number is \u201Cnormal.\u201D Both are useful. Neither is enough.'},
  {t:'h2',c:'A single number is a snapshot'},
  {t:'p',c:'Your body is not static. Hydration, sleep, stress, recent meals, even the time of day can shift many common markers. One measurement captures a moment; a series of measurements captures a pattern. Patterns are what clinicians actually reason with.'},
  {t:'q',c:'Context turns a number into information.'},
  {t:'h2',c:'What a trend can show'},
  {t:'p',c:'A gentle rise, a plateau, a seasonal dip \u2014 these shapes carry meaning that no single value can. A vitamin D level of 34 ng/mL is one fact. The same 34 ng/mL rising steadily from 26 over eighteen months is a story about how your life changed.'},
  {t:'chart',series:[95,94,93,92,93,92],labels:['Aug 25','Nov 25','Feb 26','Apr 26','Jun 26','Aug 26'],band:[70,99],unit:'mg/dL',cap:'Example: fasting glucose readings staying steady within the reference band.'},
  {t:'h2',c:'How ORA reads trends'},
  {t:'ul',c:['We always show the reference range used by the analyzing laboratory.','We compare against your own history, not a population average.','We avoid over-interpreting changes smaller than normal biological variation.','We flag patterns that may be worth discussing with your clinician \u2014 without diagnosing.']},
  {t:'p',c:'The goal is not to produce more alarms. It is to produce understanding \u2014 the kind that makes your next conversation with your clinician sharper and calmer.'},
  {t:'refs',c:['Within-subject biological variation of common laboratory markers \u2014 clinical chemistry literature.','Reference interval interpretation \u2014 clinical laboratory standards guidance.']}]},
 {id:'lab-result',cat:'Diagnostics',title:'How to understand a lab result',author:'Dr. Maya Chen',date:'Aug 12, 2026',read:'5 min',img:IMG.review,alt:'Clinicians reviewing results together',body:[
  {t:'p',c:'A laboratory result is three things at once: a measurement, a comparison, and a moment in time. Understanding all three is the difference between information and anxiety.'},
  {t:'h2',c:'Start with the reference range'},
  {t:'p',c:'Reference ranges describe where most results from a reference population fall. They are a comparison group, not a verdict. Ranges can also vary between laboratories \u2014 which is why ORA always shows the exact range used for your analysis.'},
  {t:'h2',c:'Result, range, and you'},
  {t:'p',c:'The same result can mean different things for different people. Your history, your trends, your medications and your goals all shape interpretation. That is precisely the work a clinician does \u2014 and why ORA never reduces it to a score.'},
  {t:'q',c:'A result is a conversation starter, not a conclusion.'},
  {t:'h2',c:'Questions worth asking'},
  {t:'ul',c:['What could naturally cause this to vary?','How does it compare to my previous results?','Is any follow-up actually needed, or is watchful waiting appropriate?','What, if anything, should I change before the next test?']},
  {t:'p',c:'If a result ever feels worrying, remember: a single value rarely tells the whole story, and reference ranges can vary. It may be worth discussing with your clinician.'}]},
 {id:'sleep-pattern',cat:'Sleep',title:'What your sleep pattern can tell you',author:'Dr. Elena Petrova',date:'Jul 28, 2026',read:'4 min',img:IMG.sleep,alt:'A calm bedroom in morning light',body:[
  {t:'p',c:'Sleep is the most honest signal in your health data. It reflects stress, light, caffeine, training load and routine \u2014 often before you consciously notice any of them.'},
  {t:'h2',c:'Consistency first'},
  {t:'p',c:'Research increasingly suggests that regularity \u2014 falling asleep and waking around the same times \u2014 may matter as much as total duration. A steady 6h45 can be healthier than a chaotic mix of 6 and 8.'},
  {t:'q',c:'Regular sleep is a quiet superpower.'},
  {t:'p',c:'Watch your two-week pattern, not a single night. And when you change one variable \u2014 an earlier wind-down, less late caffeine \u2014 give it two honest weeks before judging. Trends, again, beat snapshots.'}]},
 {id:'habits',cat:'Movement',title:'Building sustainable health habits',author:'ORA Coaching Team',date:'Jul 10, 2026',read:'5 min',img:IMG.hero,alt:'A calm morning moment at home',body:[
  {t:'p',c:'Most health advice fails not because it is wrong, but because it is too big. Sustainable change is small, boring, and repeated. That is the entire philosophy behind ORA programs.'},
  {t:'h2',c:'Start below your ambition'},
  {t:'ul',c:['Anchor new habits to existing routines (after coffee, before shower).','Change one variable at a time so you can see what worked.','Design the environment \u2014 make the good choice the easy choice.','Miss once, never twice \u2014 recovery matters more than perfection.']},
  {t:'p',c:'The best program is the one you barely notice yourself following, eight weeks later.'}]}];
const DOCS=[
 {name:'Comprehensive metabolic panel',cat:'Lab results',date:'Aug 8, 2026',type:'PDF \u00B7 1.2 MB'},
 {name:'Vitamin panel',cat:'Lab results',date:'Aug 8, 2026',type:'PDF \u00B7 0.8 MB'},
 {name:'Lipid panel',cat:'Lab results',date:'Feb 12, 2026',type:'PDF \u00B7 0.9 MB'},
 {name:'Personal care plan \u2014 Q3 2026',cat:'Care plans',date:'Aug 15, 2026',type:'PDF \u00B7 0.4 MB'},
 {name:'Sleep program plan',cat:'Care plans',date:'Jul 2, 2026',type:'PDF \u00B7 0.3 MB'},
 {name:'Invoice #1042',cat:'Invoices',date:'Aug 1, 2026',type:'PDF \u00B7 0.1 MB'},
 {name:'Invoice #0977',cat:'Invoices',date:'Feb 12, 2026',type:'PDF \u00B7 0.1 MB'},
 {name:'Personal Health Report \u2014 August 2026',cat:'Reports',date:'Aug 20, 2026',type:'PDF \u00B7 2.4 MB'},
 {name:'Annual summary 2025',cat:'Reports',date:'Jan 10, 2026',type:'PDF \u00B7 1.8 MB'}];
const THREADS=[
 {id:'care',name:'Care team',sub:'Preventive care',msgs:[{me:0,t:'Hi Alex \u2014 we reviewed your August panel. Overall steady. One thing to look at together: ferritin is slightly below range.',s:'Aug 20, 09:12'},{me:0,t:'Nothing urgent. Worth a short conversation at your next consultation.',s:'Aug 20, 09:13'},{me:1,t:'Thank you. I booked Thursday with Dr. Chen \u2014 I\u2019ll bring questions.',s:'Aug 20, 12:40'}]},
 {id:'lab',name:'Lab support',sub:'Diagnostics',msgs:[{me:1,t:'Do I need to fast before the metabolic panel?',s:'Aug 2, 18:02'},{me:0,t:'Yes \u2014 8\u201312 hours, water is fine. Morning slots are easiest.',s:'Aug 2, 18:20'}]},
 {id:'coach',name:'Program coach',sub:'Better Sleep',msgs:[]}];
let APPTS=[{id:1,who:'Dr. Maya Chen',img:IMG.chen,what:'Preventive health consultation',when:'Thursday, Sep 3',time:'14:30',where:'ORA Clinic / Video'}];
let BILL={balance:145.00,payments:[{d:'Aug 1, 2026',a:'-$60.00',m:'Visa \u00B7\u00B7 4821'},{d:'Feb 12, 2026',a:'-$180.00',m:'Visa \u00B7\u00B7 4821'}],invoices:[{n:'#1042',d:'Aug 1, 2026',a:'$145.00',s:'Open'},{n:'#0977',d:'Feb 12, 2026',a:'$180.00',s:'Paid'}]};
let NOTIFS=[{t:'Your August health report is ready',d:'Review overview, trends and questions for your clinician.',u:1},{t:'Ferritin: review recommended',d:'Slightly below range \u2014 context and questions available.',u:1},{t:'Appointment reminder',d:'Dr. Maya Chen \u00B7 Thu Sep 3 \u00B7 14:30.',u:0},{t:'Better Sleep \u00B7 Week 3 opened',d:'Optimization: environment, timing, caffeine.',u:0}];

/* ============ charts ============ */
function sparkSVG(series,o={}){const w=o.w||120,h=o.h||36,p=4;let mn=Math.min(...series),mx=Math.max(...series);if(o.band){mn=Math.min(mn,o.band[0]);mx=Math.max(mx,o.band[1]);}if(mn===mx){mn-=1;mx+=1;}const X=i=>p+i*(w-2*p)/(series.length-1),Y=v=>h-p-((v-mn)/(mx-mn))*(h-2*p);const pts=series.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ');let band='';if(o.band){const y1=Y(o.band[1]),y2=Y(o.band[0]);band=`<rect x="0" y="${y1}" width="${w}" height="${Math.max(2,y2-y1)}" fill="#8CA07E" opacity=".15"/>`;}return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="trend">${band}<polyline points="${pts}" fill="none" stroke="#22402E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" pathLength="1" class="tl"/><circle class="fd" cx="${X(series.length-1)}" cy="${Y(series[series.length-1])}" r="2.6" fill="#22402E"/></svg>`;}
function trendSVG(o){const w=o.w||560,h=o.h||230,L=46,R=14,T=16,B=34;const s=o.series;let mn=Math.min(...s),mx=Math.max(...s);if(o.band){mn=Math.min(mn,o.band[0]);mx=Math.max(mx,o.band[1]);}const pad=(mx-mn)*.22||1;mn-=pad;mx+=pad;const X=i=>L+i*(w-L-R)/(s.length-1),Y=v=>T+(1-(v-mn)/(mx-mn))*(h-T-B);let g='';for(let k=0;k<4;k++){const v=mx-k*(mx-mn)/3,y=Y(v);g+=`<line x1="${L}" x2="${w-R}" y1="${y}" y2="${y}" stroke="#E1DCCC"/><text x="${L-8}" y="${y+3.5}" text-anchor="end" font-size="10" fill="#9AA093">${Math.round(v*10)/10}</text>`;}let band='';if(o.band){const y1=Y(o.band[1]),y2=Y(o.band[0]);band=`<rect x="${L}" y="${y1}" width="${w-L-R}" height="${y2-y1}" fill="#8CA07E" opacity=".12"/><line x1="${L}" x2="${w-R}" y1="${y1}" y2="${y1}" stroke="#8CA07E" stroke-dasharray="3 4" opacity=".7"/><line x1="${L}" x2="${w-R}" y1="${y2}" y2="${y2}" stroke="#8CA07E" stroke-dasharray="3 4" opacity=".7"/><text x="${w-R}" y="${y1-5}" text-anchor="end" font-size="10" fill="#6E7367">Reference ${o.bandText||''}</text>`;}let area='';if(o.area){area=`<polygon points="${L},${Y(s[0])} ${s.map((v,i)=>X(i)+','+Y(v)).join(' ')} ${X(s.length-1)},${h-B} ${L},${h-B}" fill="#8CA07E" opacity=".14"/>`;}const pts=s.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ');const dots=s.map((v,i)=>`<circle class="fd" cx="${X(i)}" cy="${Y(v)}" r="${i===s.length-1?4:2.6}" fill="${i===s.length-1?'#22402E':'#8CA07E'}"/>`).join('');const xl=o.labels||[];const xt=[0,Math.floor((xl.length-1)/2),xl.length-1].filter((v,i,a)=>a.indexOf(v)===i).map(i=>`<text x="${X(i)}" y="${h-10}" text-anchor="middle" font-size="10" fill="#9AA093">${esc(xl[i]||'')}</text>`).join('');return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(o.aria||'Trend chart')}">${g}${band}${area}<polyline points="${pts}" fill="none" stroke="#22402E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" pathLength="1" class="tl"/>${dots}${xt}</svg>`;}
function barsSVG(vals,o={}){const w=o.w||560,h=o.h||180,B=26,L=8;const mx=Math.max(...vals)*1.15;const bw=(w-L*2)/vals.length;return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Bar chart">${vals.map((v,i)=>{const bh=(v/mx)*(h-B-18);const x=L+i*bw+bw*.2;return `<rect class="bar" style="animation-delay:${i*40}ms" x="${x}" y="${h-B-bh}" width="${bw*.6}" height="${bh}" rx="4" fill="${i===vals.length-1?'#22402E':'#8CA07E'}" opacity="${i===vals.length-1?1:.75}"/>`}).join('')}${(o.labels||[]).map((l,i)=>`<text x="${L+i*bw+bw*.5}" y="${h-8}" text-anchor="middle" font-size="9.5" fill="#9AA093">${esc(l)}</text>`).join('')}</svg>`;}

/* ============ ui systems ============ */
function toast(msg){const t=document.createElement('div');t.className='toast';t.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m5 12 5 5L20 7"/></svg><span>${esc(msg)}</span>`;$('#toasts').appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),350)},3400);}
function openModal(html){$('#modal-box').innerHTML=html;$('#modal').classList.add('on');$('#overlay').classList.add('on');}
function closeModal(){$('#modal').classList.remove('on');if(!$('#drawer').classList.contains('on'))$('#overlay').classList.remove('on');}
function closeDrawer(){$('#drawer').classList.remove('on');if(!$('#modal').classList.contains('on'))$('#overlay').classList.remove('on');}
$('#overlay').addEventListener('click',()=>{closeDrawer();closeModal();$('#msheet').classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();closeModal();$('#msheet').classList.remove('open');$('#mmenu').hidden=true;closeCmd();}});
const badge=s=>s==='ok'?'<span class="badge b-ok"><i></i>Within range</span>':s==='attention'?'<span class="badge b-warn"><i></i>Needs attention</span>':'<span class="badge b-warn"><i></i>Review</span>';
function openDrawer(id){const r=RESULTS.find(x=>x.id===id);if(!r)return;
 $('#drawer-body').innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px"><span class="eyebrow no-line">${r.cat}</span><button class="iconbtn" onclick="closeDrawer()" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
 <h2 class="serif" style="font-size:32px;font-weight:500;letter-spacing:-.015em">${r.name}</h2>
 <div style="display:flex;align-items:baseline;gap:10px;margin:16px 0 8px"><span class="metric num">${r.display}</span><span class="meta">${r.unit}</span></div>
 <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:8px">${badge(r.status)}<span class="meta">${r.date} \u00B7 Trend: ${r.trend}</span></div>
 <p class="meta" style="margin-bottom:22px">Reference range: <strong class="num">${r.refText}</strong></p>
 <div class="card card-pad" style="margin-bottom:22px">${trendSVG({series:r.series,labels:r.dates,band:r.ref,bandText:r.refText,aria:r.name+' history'})}</div>
 <h3 style="font-size:14px;margin-bottom:8px">What this measures</h3><p class="meta" style="line-height:1.7;margin-bottom:18px">${r.measure}</p>
 <h3 style="font-size:14px;margin-bottom:8px">Your result in context</h3><p class="meta" style="line-height:1.7;margin-bottom:18px">${r.context}</p>
 <h3 style="font-size:14px;margin-bottom:8px">Reference information</h3><p class="meta" style="line-height:1.7;margin-bottom:20px">Reference ranges can vary between laboratories and over time. The range shown is the one used for your analysis. Based on the information available, this result is presented without diagnosis.</p>
 ${r.questions.length?`<div class="card card-pad" style="background:var(--sage-soft);border-color:#DCE4D2"><h3 style="font-size:14px;margin-bottom:10px">Questions to discuss with your clinician</h3>${r.questions.map(q=>`<p class="meta" style="margin:0 0 8px;line-height:1.6">\u2022 ${q}</p>`).join('')}<a class="link" href="#/portal/book" onclick="closeDrawer()">Book a consultation ${AR}</a></div>`:''}
 <p class="note" style="margin-top:22px">Insights are informational, not a diagnosis. If something feels unexpected, it may be worth discussing with your clinician.</p>`;
 $('#drawer').classList.add('on');$('#overlay').classList.add('on');}

/* ============ animation ============ */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){animCount(e.target);cio.unobserve(e.target);}}),{threshold:.5});
function splitRich(el){if(el.dataset.done)return;el.dataset.done=1;const src=[...el.childNodes];let i=0;el.innerHTML='';const wrapW=inner=>{const w=document.createElement('span');w.className='w';const wi=document.createElement('span');wi.className='wi';wi.style.setProperty('--i',i++);wi.appendChild(inner);w.appendChild(wi);el.appendChild(w);el.appendChild(document.createTextNode(' '));};src.forEach(n=>{if(n.nodeType===3){n.textContent.split(/\s+/).filter(Boolean).forEach(word=>wrapW(document.createTextNode(word)));}else wrapW(n);});}
function animCount(el){const to=parseFloat(el.dataset.count),suf=el.dataset.suffix||'',dec=el.dataset.dec?+el.dataset.dec:0;if(reduced||isNaN(to)){el.textContent=to.toLocaleString()+suf;return;}const t0=performance.now(),dur=1400;const f=t=>{const k=Math.min(1,(t-t0)/dur),e2=1-Math.pow(1-k,3);el.textContent=(to*e2).toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);}
let PXS=[];
function initAnim(root){root.querySelectorAll('[data-split]').forEach(splitRich);root.querySelectorAll('[data-rv]').forEach(el=>io.observe(el));root.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));PXS=[...document.querySelectorAll('[data-px]')];}

/* ============ router ============ */
const VIEWS={};
function route(){
 let h=decodeURIComponent(location.hash.replace(/^#\/?/,''));const p=h.split('/').filter(Boolean);
 let name=p[0]||'home',param=p[1];
 const portal=name==='portal';
 let key=portal?(p[1]||'overview'):name;
 if(portal&&p[1]==='program')key='program';
 const V=VIEWS[key]||VIEWS.home;
 document.body.classList.toggle('mode-portal',portal);
 $('#mkt-nav').hidden=portal;$('#mkt-footer').hidden=portal;
 $('#ptop').hidden=!portal;$('#pside').hidden=!portal;$('#mtabs').hidden=!portal;
 const app=$('#app');app.innerHTML=V.render(param,p);
 window.scrollTo(0,0);initAnim(app);V.after&&V.after(param,p);
 $$('#mkt-nav .links a').forEach(a=>a.classList.toggle('on',a.dataset.nl===key||(key==='home'&&false)));
 $$('#pside a').forEach(a=>a.classList.toggle('on',a.dataset.side===key||(key==='overview'&&a.dataset.side==='overview')));
 $$('#mtabs a').forEach(a=>a.classList.toggle('on',a.dataset.tab===key||(key==='overview'&&a.dataset.tab==='overview')));
 app.style.animation='none';void app.offsetWidth;app.style.animation='';
}
addEventListener('hashchange',route);
addEventListener('scroll',()=>requestAnimationFrame(()=>{const st=scrollY,dh=document.documentElement.scrollHeight-innerHeight;$('#pbar').style.width=(dh?st/dh*100:0)+'%';$('#mkt-nav').classList.toggle('scr',st>10);if(!reduced)PXS.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const y=(r.top+r.height/2-innerHeight/2)*parseFloat(el.dataset.px);el.style.transform=`translate3d(0,${y.toFixed(1)}px,0)`;});}),{passive:true});

/* ============ shared blocks ============ */
const EB=(n,t)=>`<div class="eyebrow" data-rv="fade"><span class="en">${n}</span>${t}</div>`;
const footCTA=()=>`<section class="sec wrap" style="text-align:center"><div class="eyebrow no-line" style="justify-content:center" data-rv="fade"><span class="en">\u2733</span>Begin</div><h2 class="h-lg" data-split data-rv="split" style="margin:22px auto 26px;max-width:16ch">Begin with a <em>baseline.</em></h2><p class="lead" data-rv style="max-width:46ch;margin:0 auto 34px">One comprehensive panel. A calm, contextual picture of your health \u2014 and a plan for what comes next.</p><div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap" data-rv><a class="btn btn-primary btn-lg" href="#/portal">Get started ${AR}</a><a class="btn btn-line btn-lg" href="#/clinics">Find a clinic</a></div><p class="note" data-rv style="margin-top:26px">No obligation. Your data stays yours.</p></section>`;
const jcard=a=>`<a class="card hover" data-rv href="#/article/${a.id}" style="overflow:hidden"><div class="imgwrap" style="border-radius:0"><img loading="lazy" src="${a.img}" alt="${esc(a.alt)}" style="aspect-ratio:16/10"></div><div style="padding:22px 24px 26px"><div class="eyebrow no-line" style="margin-bottom:10px">${a.cat}</div><h3 class="h-sm" style="line-height:1.3">${a.title}</h3><p class="meta" style="margin-top:10px">${a.author} \u00B7 ${a.read} read</p></div></a>`;
if (typeof $ === 'undefined') window.$ = document.querySelector.bind(document);
if (typeof $$ === 'undefined') window.$$ = document.querySelectorAll.bind(document);

/* ================= HOME ================= */
VIEWS.home={render:()=>`
<section class="wrap" style="padding-top:150px">
 <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:34px">${EB('01','Preventive health \u2014 personalized care')}<a class="meta link" href="#/portal" data-rv="fade">Patient portal ${AR}</a></div>
 <h1 class="h-xl" data-split data-rv="split">A <em>clearer</em> picture of your health.</h1>
 <div class="grid2" style="margin-top:clamp(36px,5vw,72px);align-items:end">
  <div data-rv style="--d:.2s"><p class="lead" style="max-width:44ch;margin-bottom:30px">Understand your health with comprehensive diagnostics, expert guidance, and insights designed around you.</p>
   <div style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/portal">Explore ORA ${AR}</a><a class="btn btn-line btn-lg" href="#/diagnostics">How it works</a></div>
   <p class="note" style="margin-top:24px;max-width:40ch">ORA works alongside your clinician \u2014 never instead of them.</p></div>
  <div data-rv="img" style="--d:.15s;position:relative">
   <div class="imgwrap" style="aspect-ratio:4/3.1"><img src="${IMG.hero}" alt="A person sitting calmly by a bright window in soft morning light" data-px="0.05"></div>
   <div class="card" data-rv style="--d:.5s;position:absolute;left:-18px;bottom:26px;padding:16px 18px;width:220px;box-shadow:0 20px 50px rgba(28,32,24,.14)">
     <div class="meta" style="font-weight:600">Vitamin D \u00B7 Aug 2026</div>
     <div class="metric num" style="font-size:26px;margin:6px 0 4px">34 <small>ng/mL</small></div>
     ${sparkSVG([26,28,30,31,33,34],{w:186,h:30})}
     <div class="meta" style="margin-top:6px">Within range \u00B7 Stable</div></div>
  </div>
 </div>
</section>
<div class="marquee" style="margin-top:clamp(56px,7vw,96px)" aria-hidden="true"><div class="mtrack">${(()=>{const items='<span><b>Blood pressure</b> 118/76 \u00B7 within range</span><span class="dot">\u2733</span><span><b>Sleep</b> +42 min this month</span><span class="dot">\u2733</span><span><b>Vitamin D</b> 34 ng/mL</span><span class="dot">\u2733</span><span><b>Resting HR</b> 62 bpm \u00B7 stable</span><span class="dot">\u2733</span><span><b>HbA1c</b> 5.3%</span><span class="dot">\u2733</span><span><b>40+ biomarkers</b> read in context</span><span class="dot">\u2733</span>';return `<span>${items}</span><span>${items}</span>`;})()}</div></div>

<section class="sec wrap"><div class="grid2" style="align-items:start">
 <div style="position:sticky;top:130px">${EB('02','Philosophy')}<h2 class="h-md" data-split data-rv="split" style="margin-top:20px;max-width:14ch">Calm is a clinical feature.</h2></div>
 <div style="display:flex;flex-direction:column;gap:44px">
  <div data-rv><h3 class="h-sm" style="max-width:22ch">Health information should calm you, not alarm you.</h3><p class="meta" style="margin-top:10px;max-width:52ch;line-height:1.7">Most health products shout. We designed ORA to lower your heart rate, not raise it \u2014 plain language, no red flags without context.</p></div>
  <div data-rv><h3 class="h-sm" style="max-width:22ch">A number without context is just noise.</h3><p class="meta" style="margin-top:10px;max-width:52ch;line-height:1.7">Every result is shown with its reference range, your history, and your trend. Snapshots mislead; patterns inform.</p></div>
  <div data-rv><h3 class="h-sm" style="max-width:22ch">We turn fragments into understanding.</h3><p class="meta" style="margin-top:10px;max-width:52ch;line-height:1.7">Labs, sleep, habits, conversations with clinicians \u2014 connected into one coherent, readable picture.</p></div>
 </div></div></section>

<section class="sec wrap sec-line" id="how">
 ${EB('03','How it works')}
 <div class="hiw" style="margin-top:44px">
  <div><div class="hiw-sticky"><h2 class="h-md" style="max-width:12ch">Health, understood in <em>context.</em></h2><div class="hiw-num num" id="hiw-num">01</div><div class="hiw-rail"><i id="hiw-bar"></i></div></div></div>
  <div>${[['01','Assess','Start with a comprehensive understanding of your current health \u2014 a full diagnostic baseline, not a guess.'],['02','Understand','See what your results mean, how they relate to your goals, and which changes actually matter.'],['03','Improve','Build practical habits through expert-guided programs \u2014 small, sustainable, personal.'],['04','Track','Monitor changes over time. Trends, not snapshots \u2014 reviewed with humans, not algorithms alone.']].map(s=>`<div class="step" data-step="${s[0]}"><span class="s-n">${s[0]}</span><h3>${s[1]}</h3><p class="lead" style="max-width:44ch">${s[2]}</p></div>`).join('')}</div>
 </div>
</section>

<section class="sec wrap sec-line">
 <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:44px">
  <div>${EB('04','Diagnostics')}<h2 class="h-lg" data-split data-rv="split" style="margin-top:20px;max-width:12ch">Know more than a <em>number.</em></h2></div>
  <a class="link" href="#/diagnostics" data-rv="fade">Explore diagnostics ${AR}</a></div>
 <div class="stack">${[
  ['Heart health','Pressure, rhythm and circulation \u2014 read together, over time, never as a single scary value.',[122,120,121,119,118]],
  ['Metabolic health','Glucose, HbA1c and the markers of how your body converts food into energy.',[95,94,93,92,93,92]],
  ['Nutritional health','Vitamin D, B12, ferritin \u2014 the quiet nutrients behind energy, mood and recovery.',[26,28,30,31,33,34]],
  ['Sleep & lifestyle','Duration, consistency, stress and movement \u2014 the foundation everything else stands on.',[6.1,6.2,6.4,6.5,6.7,6.8]]
 ].map((c,i)=>`<div style="--i:${i}"><div class="card card-pad" style="padding:34px 38px;display:flex;gap:26px;justify-content:space-between;align-items:center;flex-wrap:wrap"><div style="max-width:52ch"><span class="meta num" style="font-family:var(--serif);font-style:italic">0${i+1}</span><h3 class="h-sm" style="margin:8px 0 8px">${c[0]}</h3><p class="meta" style="line-height:1.7">${c[1]}</p></div><div>${sparkSVG(c[2],{w:180,h:44})}</div></div></div>`).join('')}</div>
 <p class="note" data-rv style="margin-top:40px;max-width:70ch">ORA does not diagnose. Results are interpreted with reference ranges and reviewed with clinicians where appropriate. Reference ranges can vary.</p>
</section>

<section class="sec wrap sec-line">
 ${EB('05','The portal')}
 <h2 class="h-lg" data-split data-rv="split" style="margin-top:20px;max-width:16ch">Your health, finally <em>organized.</em></h2>
 <div class="card" data-rv="img" style="margin-top:44px;overflow:hidden;border-radius:18px">
  <div style="display:flex;align-items:center;gap:8px;padding:13px 18px;border-bottom:1px solid var(--line)"><span style="width:10px;height:10px;border-radius:50%;background:var(--line)"></span><span style="width:10px;height:10px;border-radius:50%;background:var(--line)"></span><span style="width:10px;height:10px;border-radius:50%;background:var(--line)"></span><span class="meta" style="margin-left:10px">ora.health/portal</span></div>
  <div style="padding:30px;display:grid;grid-template-columns:1.5fr 1fr;gap:22px" class="pgrid" >
   <div><h3 class="serif" style="font-size:26px;font-weight:500">Good morning, Alex</h3><p class="meta" style="margin:4px 0 18px">Here\u2019s your health overview.</p>
    ${OVERVIEW.map(c=>`<div class="hcat"><div><h4>${c.cat}</h4><p>${c.why}</p></div><span class="badge ${c.status==='ok'?'b-ok':'b-warn'}"><i></i>${c.label}</span></div>`).join('')}</div>
   <div style="display:flex;flex-direction:column;gap:14px">
    <div class="card card-pad" style="background:var(--paper)"><div class="meta" style="font-weight:600">Sleep \u00B7 last 6 months</div><div style="margin-top:10px">${sparkSVG([6.1,6.2,6.4,6.5,6.7,6.8],{w:220,h:44})}</div><p class="meta" style="margin-top:8px">+42 min over the last month</p></div>
    <div class="card card-pad" style="background:var(--paper)"><div class="meta" style="font-weight:600">Next appointment</div><p style="font-weight:600;font-size:14px;margin-top:6px">Dr. Maya Chen</p><p class="meta">Thu, Sep 3 \u00B7 14:30 \u00B7 Video</p></div>
    <a class="btn btn-primary btn-sm" href="#/portal" style="justify-content:center">Open the live portal ${AR}</a>
   </div></div>
 </div>
 <div class="g32" style="margin-top:34px">${[['Contextual statuses','No single \u201Chealth score.\u201D Categories with explanations, because you are not a number.'],['Trends that explain themselves','Reference bands, history and honest language on every chart.'],['Insights, not alarms','What changed, why it may matter, and one suggested next step.']].map(f=>`<div data-rv><h4 style="font-size:15px;margin-bottom:8px">${f[0]}</h4><p class="meta" style="line-height:1.7">${f[1]}</p></div>`).join('')}</div>
</section>

<section class="sec wrap sec-line">
 <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:30px">
  <div>${EB('06','Programs')}<h2 class="h-md" data-split data-rv="split" style="margin-top:20px">Designed around <em>real life.</em></h2></div>
  <div style="display:flex;gap:8px" data-rv="fade"><button class="iconbtn" id="hs-l" aria-label="Scroll left" style="border:1px solid var(--line)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><button class="iconbtn" id="hs-r" aria-label="Scroll right" style="border:1px solid var(--line)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div></div>
 <div class="hscroll" id="hs">${PROGRAMS.map(p=>`<div class="card hover" style="padding:26px"><div style="display:flex;justify-content:space-between"><span class="badge b-line">${p.weeks}</span>${p.progress===100?'<span class="badge b-ok"><i></i>Completed</span>':p.progress>0?`<span class="badge b-neutral num">${p.progress}%</span>`:''}</div><h3 class="h-sm" style="margin:16px 0 8px">${p.name}</h3><p class="meta" style="margin-bottom:14px">Focus \u00B7 ${p.focus}</p><p class="meta" style="line-height:1.65;margin-bottom:18px">${p.desc}</p><a class="link" href="#/portal/program/${p.id}">Explore ${AR}</a></div>`).join('')}</div>
</section>

<section style="background:var(--forest2);color:#EDEBE2" class="sec"><div class="wrap">
 ${EB('07','In numbers').replace('class="eyebrow"','class="eyebrow" style="color:#8FA383"')}
 <div class="emp-grid" style="margin-top:44px">${[['120','k+','results explained in context'],['94','%','of members report feeling calmer'],['40','+','biomarkers per comprehensive panel'],['4.9','','average member rating']].map(s=>`<div data-rv style="border-top:1px solid rgba(237,235,226,.18);padding-top:22px"><div class="serif num" style="font-size:clamp(44px,5vw,72px);line-height:1"><span data-count="${s[0]}">${s[0]}</span><em style="color:var(--sage)">${s[1]}</em></div><p style="color:#A8B2A2;font-size:13.5px;margin-top:10px">${s[2]}</p></div>`).join('')}</div>
</div></section>

<section class="sec wrap"><div class="g32">${[['\u201CFor the first time, I understood my own lab results. No panic, just a plan.\u201D','Amelia R.','Member since 2025'],['\u201CThe sleep program changed my evenings. Small things, big difference.\u201D','Daniel K.','Better Sleep, Week 4'],['\u201CIt feels like a calm friend who happens to be a doctor.\u201D','Priya S.','Member since 2024']].map((t,i)=>`<figure data-rv style="--d:${i*.1}s;border-top:1px solid var(--line);padding-top:24px"><blockquote class="serif" style="font-size:21px;line-height:1.4;font-style:italic">${t[0]}</blockquote><figcaption class="meta" style="margin-top:16px"><b style="color:var(--ink)">${t[1]}</b> \u00B7 ${t[2]}</figcaption></figure>`).join('')}</div></section>

<section class="sec wrap sec-line"><div class="grid2" style="align-items:center">
 <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1.05"><img loading="lazy" src="${IMG.arch}" alt="A calm sunlit corridor with an olive tree" data-px="0.05"></div></div>
 <div>${EB('08','Privacy')}<h2 class="h-lg" data-split data-rv="split" style="margin:20px 0 18px;max-width:12ch">Your health data belongs to <em>you.</em></h2>
 <p class="lead" style="max-width:44ch;margin-bottom:26px">We built ORA so that sensitive information stays sensitive. You decide what is collected, who sees it, and for how long.</p>
 ${[['Encryption everywhere','Records encrypted in transit and at rest, always.'],['Granular access','Choose exactly which clinicians see which information.'],['Consent, in plain language','Sharing is opt-in, reversible, and explained simply.'],['Export or delete anytime','Download your full record, or remove it entirely.']].map(pt=>`<div data-rv style="display:flex;gap:14px;padding:15px 0;border-top:1px solid var(--line)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--sage2)" stroke-width="2" stroke-linecap="round" style="flex:none;margin-top:3px"><path d="m5 12 5 5L20 7"/></svg><div><h4 style="font-size:14.5px;margin-bottom:3px">${pt[0]}</h4><p class="meta">${pt[1]}</p></div></div>`).join('')}
 <a class="link" href="#/security" data-rv style="margin-top:20px">How we protect your data ${AR}</a></div>
</div></section>

<section class="sec wrap sec-line">
 <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:34px">
  <div>${EB('09','Journal')}<h2 class="h-md" data-split data-rv="split" style="margin-top:20px">Calm, evidence-informed <em>reading.</em></h2></div>
  <a class="link" href="#/insights" data-rv="fade">Browse the journal ${AR}</a></div>
 <div class="g32">${ARTICLES.slice(0,3).map(jcard).join('')}</div>
</section>
${footCTA()}`,

after: () => {
  const steps = $$('.step');
  if (steps.length) {
    const io2 = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        const n = e.target.dataset.step;
        const num = $('#hiw-num');
        if (num) {
          num.textContent = n;
          const bar = $('#hiw-bar');
          if (bar) bar.style.height = (+n / 4 * 100) + '%';
        }
        steps.forEach(s => s.classList.toggle('act', s === e.target));
      }
    }), { rootMargin: '-42% 0px -50% 0px' });
    steps.forEach(s => io2.observe(s));
  }

  const hs = $('#hs');
  if (hs) {
    const left = $('#hs-l');
    if (left) left.onclick = () => hs.scrollBy({ left: -360, behavior: 'smooth' });
    const right = $('#hs-r');
    if (right) right.onclick = () => hs.scrollBy({ left: 360, behavior: 'smooth' });
  }
}};

/* ================= DIAGNOSTICS ================= */
VIEWS.diagnostics={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','Diagnostics')}
 <div class="grid2" style="margin-top:26px;align-items:center">
  <div><h1 class="h-lg" data-split data-rv="split">Understand the <em>signals</em> that matter.</h1>
  <p class="lead" data-rv style="margin:24px 0 32px;max-width:46ch">Comprehensive panels, analyzed in accredited laboratories and reviewed by clinicians \u2014 then explained to you in language that makes sense.</p>
  <div data-rv style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/portal/book">Book diagnostics ${AR}</a><a class="btn btn-line btn-lg" href="#/portal/report">See a sample report</a></div></div>
  <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img src="${IMG.lab}" alt="A laboratory professional examining a sample in a calm laboratory" data-px="0.05"></div></div>
 </div>
</section>
<section class="sec wrap sec-line">
 ${EB('02','The process')}
 <div style="margin-top:36px">${[['Book','Choose a clinic or home visit in under two minutes.'],['Visit','A calm, unhurried sample collection \u2014 no queues, no chaos.'],['Analyze','Accredited laboratories process your full panel.'],['Understand','Results arrive with context, reference ranges and trends.'],['Follow up','Guidance, and the right questions for your clinician.']].map((s,i)=>`<div data-rv style="display:grid;grid-template-columns:90px 1fr 2fr;gap:22px;padding:26px 0;border-top:1px solid var(--line);align-items:baseline"><span class="serif num" style="font-style:italic;color:var(--sage2);font-size:20px">0${i+1}</span><h3 class="h-sm">${s[0]}</h3><p class="meta" style="line-height:1.7">${s[1]}</p></div>`).join('')}</div>
</section>
<section class="sec wrap sec-line"><div class="grid2" style="align-items:center">
 <div>${EB('03','The lab experience')}<h2 class="h-md" data-split data-rv="split" style="margin:20px 0 26px">From sample to <em>understanding.</em></h2>
  <div style="display:flex;flex-direction:column">${['Sample collected \u2014 at an ORA clinic or at home','Laboratory analysis \u2014 accredited partner laboratories','Clinical review \u2014 patterns, not just values','Results available \u2014 with ranges and trends','Personalized guidance \u2014 next steps and questions'].map((t,i,arr)=>`<div data-rv style="display:flex;gap:16px;padding:16px 0;${i<arr.length-1?'border-bottom:1px solid var(--line)':''}"><span class="badge b-neutral num">${i+1}</span><p style="font-size:14.5px;font-weight:${i===arr.length-1?600:500}">${t}</p></div>`).join('')}</div></div>
 <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img loading="lazy" src="${IMG.review}" alt="Clinicians reviewing results together" data-px="0.05"></div></div>
</div>
<p class="note" data-rv style="margin-top:44px;max-width:74ch">Reference ranges can vary between laboratories. ORA always shows the range used for your analysis, and never interprets a result in isolation. Insights are informational and do not replace consultation with a qualified clinician.</p>
</section>
<section class="sec wrap sec-line">
 ${EB('04','What we measure')}
 <h2 class="h-md" data-split data-rv="split" style="margin:20px 0 40px">Six systems. One coherent <em>picture.</em></h2>
 <div class="g32">${[['Heart health','Blood pressure, resting heart rate, circulation markers'],['Metabolic health','Glucose, HbA1c, insulin sensitivity markers'],['Nutritional health','Vitamin D, B12, ferritin, magnesium'],['Hormonal health','TSH, cortisol, key hormonal signals'],['Sleep','Duration, consistency, recovery patterns'],['Lifestyle','Movement, stress, habits \u2014 in context']].map(c=>`<div class="card hover card-pad" data-rv><h4 style="font-size:15px;margin-bottom:8px">${c[0]}</h4><p class="meta" style="line-height:1.6">${c[1]}</p></div>`).join('')}</div>
</section>
${footCTA()}`};

/* ================= PROGRAMS MKT ================= */
VIEWS.programs={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','Programs')}
 <div class="grid2" style="margin-top:26px;align-items:end">
  <h1 class="h-lg" data-split data-rv="split">Small weeks. <em>Lasting</em> change.</h1>
  <p class="lead" data-rv style="max-width:44ch">Structured, expert-guided programs that turn your results into gentle, sustainable habits. No streaks, no shame, no confetti.</p></div>
</section>
<section class=" wrap" style="padding-top:50px">
 ${PROGRAMS.map((p,i)=>`<a href="#/portal/program/${p.id}" data-rv style="display:grid;grid-template-columns:80px 1.2fr 1.6fr auto;gap:26px;padding:34px 0;border-top:1px solid var(--line);align-items:center" class="prow">
  <span class="serif num" style="font-style:italic;color:var(--sage2);font-size:20px">0${i+1}</span>
  <div><h3 class="h-sm">${p.name}</h3><p class="meta" style="margin-top:6px">${p.weeks} \u00B7 ${p.focus}</p></div>
  <p class="meta" style="line-height:1.7">${p.desc}</p>
  <span class="iconbtn" style="border:1px solid var(--line)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span></a>`).join('')}
</section>
<section class=" wrap sec-line"><div class="grid2" style="align-items:center">
 <div>${EB('02','Inside every program')}<h2 class="h-md" data-split data-rv="split" style="margin:20px 0 26px">Structure without <em>pressure.</em></h2>
  <div class="g32" style="grid-template-columns:1fr 1fr">${[['Education','Short, evidence-informed lessons \u2014 five minutes, not fifty.'],['Daily actions','One small thing per day, anchored to your routine.'],['Tracking','Gentle check-ins that build your personal trend line.'],['Expert check-ins','Humans who review your progress and adjust the plan.']].map(f=>`<div data-rv style="border-top:1px solid var(--line);padding-top:16px"><h4 style="font-size:14.5px;margin-bottom:6px">${f[0]}</h4><p class="meta" style="line-height:1.65">${f[1]}</p></div>`).join('')}</div></div>
 <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img loading="lazy" src="${IMG.sleep}" alt="A calm bedroom in morning light" data-px="0.05"></div></div>
</div></section>
${footCTA()}`};

/* ================= PRICING ================= */
VIEWS.pricing={render:()=>`
<section class="wrap" style="padding-top:150px;text-align:center">
 <div class="eyebrow no-line" style="justify-content:center" data-rv="fade"><span class="en">01</span>Pricing</div>
 <h1 class="h-lg" data-split data-rv="split" style="margin:22px auto 20px;max-width:16ch">Honest care, <em>honest</em> pricing.</h1>
 <p class="lead" data-rv style="max-width:48ch;margin:0 auto 30px">Start free. Upgrade when you want diagnostics and expert guidance. Cancel anytime \u2014 your data remains exportable.</p>
 <div data-rv style="display:inline-flex;align-items:center;gap:14px;border:1px solid var(--line);border-radius:999px;padding:6px 8px;background:var(--surface)"><button class="tabbtn on" id="pl-m">Monthly</button><button class="tabbtn" id="pl-a">Annual <span style="opacity:.7">\u00B7 2 months free</span></button></div>
</section>
<section class="wrap sec" style="padding-top:56px">
 <div class="g32" style="align-items:stretch" id="plans">${[
  ['Essentials','0','0',['Patient portal & results in context','Trends & reference ranges','Daily check-in & insights','Secure messaging']],
  ['Complete','29','24',['Everything in Essentials','Annual comprehensive diagnostics','2 clinician consultations / yr','All wellness programs','Priority lab support'],1],
  ['Concierge','79','66',['Everything in Complete','Quarterly diagnostic panels','Unlimited clinician messaging','Dedicated care coordinator','Family sharing (2 adults)']]
 ].map(pl=>`<div class="card card-pad ${pl[5]?'':'hover'}" data-rv style="padding:34px 32px;display:flex;flex-direction:column;${pl[5]?'background:var(--forest2);color:#EDEBE2;border-color:var(--forest2)':''}">
  ${pl[5]?'<span class="badge b-line" style="border-color:rgba(237,235,226,.3);color:var(--sage);align-self:flex-start">Most chosen</span>':'<span style="height:22px"></span>'}
  <h3 class="h-sm" style="margin:14px 0 4px">${pl[0]}</h3>
  <div class="serif num" style="font-size:52px;line-height:1;margin:14px 0 4px">$<span data-pm="${pl[1]}" data-pa="${pl[2]}">${pl[1]}</span><span class="meta" style="${pl[5]?'color:#A8B2A2':''}"> /mo</span></div>
  <p class="meta" style="${pl[5]?'color:#A8B2A2':''};margin-bottom:20px" data-per>${pl[1]==='0'?'Free forever':'Billed monthly'}</p>
  <div style="flex:1">${pl[3].map(f=>`<div style="display:flex;gap:10px;padding:9px 0;border-top:1px solid ${pl[5]?'rgba(237,235,226,.14)':'var(--line2)'};font-size:13.5px"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${pl[5]?'#8CA07E':'#5F7A52'}" stroke-width="2" stroke-linecap="round" style="flex:none;margin-top:3px"><path d="m5 12 5 5L20 7"/></svg>${f}</div>`).join('')}</div>
  <a class="btn ${pl[5]?'btn-light':'btn-line'}" style="justify-content:center;margin-top:24px" href="#/portal">${pl[1]==='0'?'Start free':'Choose '+pl[0]}</a></div>`).join('')}</div>
</section>
<section class="sec wrap sec-line" id="faq">
 <div class="grid2" style="align-items:start"><div style="position:sticky;top:130px">${EB('02','Questions')}<h2 class="h-md" data-split data-rv="split" style="margin-top:20px;max-width:12ch">Asked, <em>answered.</em></h2><p class="meta" data-rv style="margin-top:16px;max-width:36ch">Something else? <a class="link" href="#/contact">Contact us</a>.</p></div>
 <div>${[
  ['Is ORA a replacement for my doctor?','No \u2014 and it never will be. ORA prepares you for better conversations with your clinician by organizing your information, explaining context, and suggesting questions. Diagnoses and treatment decisions always belong to you and your clinician.'],
  ['What happens if a result looks concerning?','You will see calm, contextual language \u2014 never an alarm. We explain what the marker is, how it compares to your history and the reference range, and suggest whether it may be worth discussing with your clinician.'],
  ['Which laboratories do you use?','ORA partners with accredited clinical laboratories. Every result shows the exact reference range used by the analyzing laboratory, because ranges can vary.'],
  ['Can I share my data with my own physician?','Yes. One tap exports a complete, clinician-friendly health report (PDF) with results, trends, reference ranges and your questions.'],
  ['How is my data protected?','Encryption in transit and at rest, granular access controls, two-factor authentication, and consent-based sharing. You can export or delete everything at any time.'],
  ['Can I cancel anytime?','Yes. Your membership cancels instantly at period end, and your records remain exportable forever.']]
 .map(f=>`<div class="acc" data-rv><button class="acc-h" aria-expanded="false">${f[0]}<span class="pl"></span></button><div class="acc-p"><div><p>${f[1]}</p></div></div></div>`).join('')}</div></div>
</section>
${footCTA()}`,
after:()=>{
 const setA=a=>{$$('#plans [data-pm]').forEach(el=>el.textContent=a?el.dataset.pa:el.dataset.pm);$$('#plans [data-per]').forEach((el,i)=>{el.textContent=i===0?'Free forever':(a?'Billed annually':'Billed monthly');});$('#pl-m').classList.toggle('on',!a);$('#pl-a').classList.toggle('on',a);};
 $('#pl-m').onclick=()=>setA(false);$('#pl-a').onclick=()=>setA(true);
 $$('.acc-h').forEach(b=>b.onclick=()=>{const a=b.closest('.acc');a.classList.toggle('open');b.setAttribute('aria-expanded',a.classList.contains('open'));});
}};

/* ================= EMPLOYERS ================= */
VIEWS.employers={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','ORA for employers')}
 <div class="grid2" style="margin-top:26px;align-items:center">
  <div><h1 class="h-lg" data-split data-rv="split">Health benefits people <em>actually</em> use.</h1>
  <p class="lead" data-rv style="margin:22px 0 30px;max-width:48ch">Preventive care, diagnostics and wellness programs your teams will genuinely value \u2014 with privacy guarantees you can stand behind.</p>
  <div data-rv style="display:flex;gap:14px;flex-wrap:wrap"><button class="btn btn-primary btn-lg" id="emp-talk">Talk to our team ${AR}</button><button class="btn btn-line btn-lg" id="emp-dl">Download overview</button></div></div>
  <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img loading="lazy" src="${IMG.team}" alt="A calm team meeting in a warm modern studio" data-px="0.05"></div></div>
 </div>
</section>
<section class="sec wrap sec-line">
 <div class="g32">${[['Preventive care','Annual baselines and follow-ups, built into the workday.'],['Diagnostics','Comprehensive panels with clinical review included.'],['Wellness programs','Sleep, metabolic, stress and nutrition programs.'],['Employee insights','Aggregated, privacy-preserving population trends.'],['Care navigation','Help finding the right care, at the right time.'],['Privacy by architecture','Individual health data is never visible to employers. Ever.']].map(f=>`<div data-rv style="border-top:1px solid var(--line);padding-top:18px"><h4 style="font-size:15px;margin-bottom:8px">${f[0]}</h4><p class="meta" style="line-height:1.65">${f[1]}</p></div>`).join('')}</div>
</section>
<section class="sec wrap sec-line">
 ${EB('02','Aggregated overview')}
 <div class="card card-pad" data-rv style="margin-top:36px;padding:36px 38px">
  <div style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:22px"><h3 class="h-sm">Population overview \u2014 Acme Corp</h3><span class="badge b-neutral">Q3 2026</span></div>
  <div class="privacy-banner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Aggregated and anonymized. Groups smaller than 10 are never shown. No individual health information is ever displayed or shared.</div>
  <div class="emp-grid">${[['Program participation','64%'],['Engagement','58%'],['Education completion','71%'],['Care utilization','42%']].map(m=>`<div class="card card-pad" style="background:var(--paper)"><p class="meta">${m[0]}</p><p class="metric num" style="margin-top:8px">${m[1]}</p><p class="meta" style="margin-top:6px;color:var(--ok)">\u2191 vs last quarter</p></div>`).join('')}</div>
  <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:28px;margin-top:28px" id="emp-charts"></div>
 </div>
</section>
${footCTA()}`,
after:()=>{
 $('#emp-charts').innerHTML=`<div><p class="meta" style="margin-bottom:10px">Participation by program</p>${barsSVG([72,58,41,49,63],{w:420,h:170}).replace('</svg>',['Sleep','Metab','Heart','Stress','Nutr'].map((l,i)=>`<text x="${8+i*84+42*.5+8}" y="162" text-anchor="middle" font-size="9.5" fill="#9AA093">${l}</text>`).join('')+'</svg>')}</div><div><p class="meta" style="margin-bottom:10px">Monthly active engagement</p>${trendSVG({series:[41,44,47,52,55,58],labels:['Mar','Apr','May','Jun','Jul','Aug'],w:300,h:170,area:true})}</div>`;
 $('#emp-talk').onclick=()=>openModal(`<div style="padding:30px"><h3 class="serif" style="font-size:24px;font-weight:500;margin-bottom:6px">Talk to our team</h3><p class="meta" style="margin-bottom:20px">A 20-minute introduction \u2014 no pressure, no jargon.</p><div class="field"><label>Work email</label><input class="input" type="email" placeholder="you@company.com"></div><div class="field"><label>Company size</label><select class="select"><option>50\u2013200</option><option>200\u20131000</option><option>1000+</option></select></div><button class="btn btn-primary" style="width:100%;justify-content:center" onclick="closeModal();toast('Thanks \u2014 our team will reach out within one business day.')">Request intro</button></div>`);
 $('#emp-dl').onclick=()=>toast('Employer overview PDF downloading.');
}};

/* ================= INSIGHTS / ARTICLE ================= */
VIEWS.insights={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','The ORA Journal')}
 <h1 class="h-lg" data-split data-rv="split" style="margin:22px 0 30px;max-width:14ch">Insights for the <em>long run.</em></h1>
 <div class="tabs" id="j-cats"></div>
 <div class="g32" id="j-grid" style="grid-template-columns:repeat(2,1fr)"></div>
</section>`,
after:()=>renderJournal('All')};
function renderJournal(cat){
 const cats=['All','Preventive health','Sleep','Nutrition','Movement','Mental wellbeing','Longevity','Diagnostics'];
 $('#j-cats').innerHTML=cats.map(c=>`<button class="tabbtn ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
 $$('#j-cats .tabbtn').forEach(b=>b.onclick=()=>renderJournal(b.dataset.c));
 const list=ARTICLES.filter(a=>cat==='All'||a.cat===cat);
 $('#j-grid').innerHTML=(list.length?list:ARTICLES).map(jcard).join('')||`<div class="empty"><h4>Nothing here yet</h4><p>New essays are published monthly.</p></div>`;
 initAnim($('#j-grid'));
}
VIEWS.article={render:(id)=>{const a=ARTICLES.find(x=>x.id===id)||ARTICLES[0];return `
<section class="wrap" style="padding-top:130px"><div class="article">
 <a class="link" href="#/insights"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="transform:rotate(180deg)"><path d="M5 12h14m-6-6 6 6-6 6"/></svg> Journal</a>
 <div class="eyebrow no-line" style="margin-top:22px">${a.cat}</div>
 <h1 data-split data-rv="split">${a.title}</h1>
 <p class="meta">${a.author} \u00B7 ${a.date} \u00B7 ${a.read} read</p>
 <div data-rv="img"><img class="heroimg" src="${a.img}" alt="${esc(a.alt)}"></div>
 ${a.body.map(b=>{if(b.t==='p')return `<p data-rv>${b.c}</p>`;if(b.t==='h2')return `<h2 data-rv>${b.c}</h2>`;if(b.t==='q')return `<blockquote data-rv>\u201C${b.c}\u201D</blockquote>`;if(b.t==='ul')return `<ul data-rv>${b.c.map(li=>`<li>${li}</li>`).join('')}</ul>`;if(b.t==='chart')return `<figure class="card card-pad" data-rv style="margin:28px 0">${trendSVG({series:b.series,labels:b.labels,band:b.band,bandText:b.unit,w:640,h:220})}<figcaption class="note" style="margin-top:10px">${b.cap}</figcaption></figure>`;if(b.t==='refs')return `<div style="border-top:1px solid var(--line);margin-top:30px;padding-top:18px"><p class="note"><b>References & further reading</b><br>${b.c.map((r,i)=>`${i+1}. ${r}`).join('<br>')}</p></div>`;return '';}).join('')}
 <p class="note" data-rv style="margin-top:26px">This article is educational and not medical advice. Reference ranges can vary; insights are informational. It may be worth discussing your individual situation with your clinician.</p>
 <h2 style="font-size:17px;font-family:var(--font);font-weight:700;margin-top:30px" data-rv>Related topics</h2>
 <div class="tabs" style="margin-top:14px" data-rv>${['Diagnostics','Sleep','Preventive health','Longevity'].map(t=>`<a class="tabbtn" href="#/insights">${t}</a>`).join('')}</div>
</div></section>`;}};

/* ================= CLINICS / CLINIC / CLINICIAN ================= */
VIEWS.clinics={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','Locations')}
 <h1 class="h-lg" data-split data-rv="split" style="margin:22px 0 34px">Find a <em>clinic.</em></h1>
 <div class="card card-pad" data-rv style="display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:12px;padding:16px;margin-bottom:34px">
  <div><label class="meta" style="display:block;margin-bottom:5px">Location</label><input class="input" id="cq" placeholder="City or neighborhood"></div>
  <div><label class="meta" style="display:block;margin-bottom:5px">Service</label><select class="select" id="cs"><option value="">All services</option><option>Diagnostics</option><option>Consultations</option><option>Sleep program</option><option>Nutrition</option></select></div>
  <div><label class="meta" style="display:block;margin-bottom:5px">Max distance</label><select class="select" id="cd"><option value="99">Any</option><option value="2">Under 2 mi</option><option value="5">Under 5 mi</option></select></div>
  <div style="align-self:end"><button class="btn btn-primary" id="c-search">Search</button></div></div>
 <div class="clinic-grid"><div id="clinic-list" style="display:flex;flex-direction:column;gap:16px"></div><div class="map-box" id="clinic-map"></div></div>
</section>`,after:()=>renderClinics()};
function renderClinics(){
 const q=($('#cq')?$('#cq').value:'').toLowerCase(),svc=$('#cs'?$('#cs').value:'',dist=+($('#cd')?$('#cd').value:99));
 const list=CLINICS.filter(c=>(!q||c.addr.toLowerCase().includes(q)||c.name.toLowerCase().includes(q))&&(!svc||c.svc.includes(svc))&&c.dist<=dist);
 $('#clinic-list').innerHTML=list.length?list.map(c=>`<div class="card hover card-pad" data-rv="fade">
  <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h3 class="h-sm">${c.name}</h3><p class="meta" style="margin:6px 0 12px">${c.addr} \u00B7 ${c.dist} mi</p></div><span class="badge b-ok"><i></i>${c.avail}</span></div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">${c.svc.map(s=>`<span class="badge b-line">${s}</span>`).join('')}</div>
  <p class="meta">${c.hours}</p>
  <a class="link" href="#/clinic/${c.id}" style="margin-top:14px">View clinic ${AR}</a></div>`).join(''):`<div class="empty"><h4>No clinics match</h4><p>Try widening the distance or clearing the service filter.</p><button class="btn btn-line btn-sm" onclick="document.getElementById('cq').value='';document.getElementById('cs').value='';document.getElementById('cd').value='99';renderClinics();">Clear filters</button></div>`;
 $('#clinic-map').innerHTML=`<svg viewBox="0 0 100 100" width="100%" style="display:block" role="img" aria-label="Map of clinics"><rect width="100" height="100" fill="#EFF2EC"/>${[18,38,58,78].map(y=>`<line x1="0" x2="100" y1="${y}" y2="${y}" stroke="#DFE5D8" stroke-width="1.4"/>`).join('')}${[22,46,70].map(x=>`<line y1="0" y2="100" x1="${x}" x2="${x}" stroke="#DFE5D8" stroke-width="1.4"/>`).join('')}<path d="M0 52 C 30 46, 62 60, 100 50" stroke="#C9D4C0" stroke-width="3" fill="none"/>${CLINICS.map(c=>`<circle cx="${c.pin[0]}" cy="${c.pin[1]}" r="6.5" fill="#22402E" opacity=".15"/><circle cx="${c.pin[0]}" cy="${c.pin[1]}" r="3.2" fill="#22402E"/>`).join('')}</svg><div style="padding:12px 16px" class="meta">Map is illustrative \u00B7 ${CLINICS.length} locations.</div>`;
 initAnim($('#clinic-list'));
}
VIEWS.clinic={render:(id)=>{const c=CLINICS.find(x=>x.id===id)||CLINICS[0];return `
<section class="wrap" style="padding-top:130px">
 <a class="link" href="#/clinics"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="transform:rotate(180deg)"><path d="M5 12h14m-6-6 6 6-6 6"/></svg> All clinics</a>
 <div class="grid2" style="margin-top:26px;align-items:start">
  <div><h1 class="h-lg" data-split data-rv="split" style="font-size:clamp(32px,4vw,52px)">${c.name}</h1><p class="meta" data-rv style="margin:10px 0 26px">${c.addr}</p>
  <div data-rv="img"><div class="imgwrap" style="aspect-ratio:16/10"><img loading="lazy" src="${IMG.clinic}" alt="Calm warm reception of an ORA clinic"></div></div>
  <div class="card card-pad" data-rv style="margin-top:24px"><h3 class="sect-title">Clinicians here</h3>${CLINICIANS.slice(0,2).map(cl=>`<div class="kv"><span style="font-weight:600">${cl.name}</span><a class="link" href="#/clinician/${cl.id}">Profile ${AR}</a></div>`).join('')}</div></div>
  <div class="pcol" data-rv>
   <div class="card card-pad"><span class="badge b-ok"><i></i>${c.avail}</span>
    <h3 class="sect-title" style="margin-top:20px">Services</h3><div style="display:flex;gap:6px;flex-wrap:wrap">${c.svc.map(s=>`<span class="badge b-line">${s}</span>`).join('')}</div>
    <h3 class="sect-title" style="margin-top:20px">Opening hours</h3><p class="meta">${c.hours}</p>
    <h3 class="sect-title" style="margin-top:20px">Accessibility</h3><p class="meta">Step-free entry \u00B7 elevator to all floors \u00B7 quiet room available.</p>
    <h3 class="sect-title" style="margin-top:20px">Directions</h3><p class="meta">4 min from transit \u00B7 validated parking on-site.</p>
    <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap"><a class="btn btn-primary" href="#/portal/book">Book here ${AR}</a><button class="btn btn-line" onclick="toast('Directions copied to clipboard.')">Directions</button></div></div>
  </div></div>
</section>`;}};
VIEWS.clinician={render:(id)=>{const c=CLINICIANS.find(x=>x.id===id)||CLINICIANS[0];return `
<section class="wrap" style="padding-top:130px"><div class="grid2" style="align-items:start">
 <div data-rv="img">${c.img?`<div class="imgwrap" style="aspect-ratio:1/1.05"><img src="${c.img}" alt="Portrait of ${c.name}"></div>`:`<div class="avatar" style="width:140px;height:140px;font-size:40px">${c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>`}
 <div class="card card-pad" data-rv style="margin-top:22px"><h3 class="sect-title">Availability</h3><div style="display:flex;gap:6px">${c.avail.map(d=>`<span class="badge b-line">${d}</span>`).join('')}</div><a class="btn btn-primary" href="#/portal/book" style="margin-top:18px;width:100%;justify-content:center">Book with ${c.name.split(',')[0].split(' ').slice(0,2).join(' ')}</a></div></div>
 <div><div class="eyebrow no-line" data-rv="fade">${c.role}</div><h1 class="h-lg" data-split data-rv="split" style="font-size:clamp(32px,4vw,52px);margin:14px 0 26px">${c.name}</h1>
  <div class="card card-pad" data-rv><div class="kv"><span class="k">Education</span><span class="v" style="font-weight:500;max-width:60%">${c.edu}</span></div><div class="kv"><span class="k">Experience</span><span class="v" style="font-weight:500;max-width:60%">${c.exp}</span></div><div class="kv"><span class="k">Languages</span><span class="v" style="font-weight:500">${c.lang.join(', ')}</span></div></div>
  <h3 class="sect-title" data-rv style="margin:26px 0 12px">Specialties</h3><div style="display:flex;gap:8px;flex-wrap:wrap" data-rv>${c.spec.map(s=>`<span class="badge b-line" style="padding:7px 14px">${s}</span>`).join('')}</div>
  <p class="note" data-rv style="margin-top:26px;max-width:56ch">Credentials are verified at onboarding and reviewed annually. ORA clinicians practice within their scope and never provide diagnoses through the portal.</p></div>
</div></section>`;}};

/* ================= ABOUT ================= */
VIEWS.about={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','About ORA')}
 <h1 class="h-lg" data-split data-rv="split" style="max-width:18ch;margin-top:24px">Healthcare should help you <em>understand,</em> not just react.</h1>
 <div class="grid2" style="margin-top:44px;align-items:center">
  <div data-rv><p class="lead" style="margin-bottom:20px">ORA Health began with a simple observation: most people receive their health information as fragments \u2014 a number here, a PDF there \u2014 with little context and no follow-through.</p>
  <p class="meta" style="line-height:1.8;max-width:52ch">We built ORA to connect those fragments into a coherent, calm picture \u2014 combining comprehensive diagnostics, clinical expertise and continuous insight. We are not a hospital, and we do not replace your clinician. We make the conversations you have with them better.</p></div>
  <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img loading="lazy" src="${IMG.arch}" alt="A calm sunlit corridor" data-px="0.05"></div></div>
 </div>
</section>
<section class="sec wrap sec-line">
 ${EB('02','The story')}
 <div style="margin-top:36px">${[['2023','Founded in San Francisco around one question: why does health information feel so alarming?'],['2024','First ORA Clinic opens in SoMa. The calm-clinic design language is born.'],['2025','10,000 members. Wellness programs launch with sleep medicine first.'],['2026','The contextual portal \u2014 trends, insights and reports in plain language.']].map(t=>`<div data-rv style="display:grid;grid-template-columns:120px 1fr;gap:26px;padding:26px 0;border-top:1px solid var(--line)"><span class="serif num" style="font-style:italic;color:var(--sage2);font-size:22px">${t[0]}</span><p style="font-size:16px;max-width:60ch">${t[1]}</p></div>`).join('')}</div>
</section>
<section class="sec wrap sec-line">
 ${EB('03','Principles')}
 <div class="g32" style="margin-top:36px;grid-template-columns:repeat(4,1fr)">${[['Clarity','Information should reduce anxiety, not create it.'],['Context','No number is read in isolation. Ever.'],['Continuity','Health is a long story. We help you read it.'],['Care','Humans review what matters. Always.']].map(pr=>`<div data-rv style="border-top:1px solid var(--line);padding-top:18px"><h3 class="h-sm" style="margin-bottom:8px">${pr[0]}</h3><p class="meta" style="line-height:1.65">${pr[1]}</p></div>`).join('')}</div>
</section>
<section class="sec wrap sec-line">
 ${EB('04','The team')}
 <div data-rv="img" style="margin-top:36px"><div class="imgwrap" style="aspect-ratio:21/9"><img loading="lazy" src="${IMG.team}" alt="The ORA team in conversation around a warm oak table"></div></div>
 <div class="g32" style="margin-top:34px;grid-template-columns:repeat(4,1fr)">${CLINICIANS.map(c=>`<a class="card hover card-pad" data-rv href="#/clinician/${c.id}" style="padding:22px">${c.img?`<span class="avatar" style="width:56px;height:56px"><img src="${c.img}" alt=""></span>`:`<span class="avatar" style="width:56px;height:56px;font-size:17px">${c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</span>`}<h4 style="font-size:15px;margin-top:14px">${c.name}</h4><p class="meta" style="margin-top:4px">${c.role}</p></a>`).join('')}</div>
</section>
${footCTA()}`};

/* ================= SECURITY MKT ================= */
VIEWS.security={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','Security & privacy')}
 <div class="grid2" style="margin-top:26px;align-items:center">
  <div><h1 class="h-lg" data-split data-rv="split">Your health data belongs to <em>you.</em></h1>
  <p class="lead" data-rv style="margin:22px 0 30px;max-width:46ch">Security is not a feature at ORA \u2014 it is the architecture. Here is exactly how your information is protected, in plain language.</p>
  <div data-rv><a class="btn btn-primary btn-lg" href="#/portal/security">Open security settings ${AR}</a></div></div>
  <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img loading="lazy" src="${IMG.arch}" alt="A calm secure corridor" data-px="0.05"></div></div></div>
</section>
<section class="sec wrap sec-line">
 <div class="g32">${[['Encryption everywhere','AES-256 at rest, TLS 1.3 in transit. Your records are unreadable to anyone without explicit, revocable access.'],['Access controls','Role-based, least-privilege access. You approve exactly who sees what \u2014 and can revoke it anytime.'],['Two-factor by default','2FA is required for every account. New devices require verification before seeing any health data.'],['Consent, in plain language','No dark patterns. Sharing is opt-in, reversible, and explained in sentences, not legalese.'],['Your rights','Export everything, delete everything, correct anything. One click in your privacy settings.'],['Compliance posture','HIPAA-aligned operations, GDPR-ready rights, SOC 2 Type II in progress.']].map(f=>`<div data-rv style="border-top:1px solid var(--line);padding-top:18px"><h4 style="font-size:15px;margin-bottom:8px">${f[0]}</h4><p class="meta" style="line-height:1.7">${f[1]}</p></div>`).join('')}</div>
 <p class="note" data-rv style="margin-top:40px;max-width:74ch">We never sell health data. We never share identifiable information with employers. Aggregated employer insights exclude groups smaller than ten and never contain individual results.</p>
</section>
${footCTA()}`};

/* ================= CONTACT ================= */
VIEWS.contact={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','Contact')}
 <h1 class="h-lg" data-split data-rv="split" style="max-width:14ch;margin-top:22px">We answer, <em>calmly.</em></h1>
 <div class="grid2" style="margin-top:44px;align-items:start">
  <div>
   ${[['Secure messaging','Fastest \u2014 inside your portal, encrypted end-to-end.','Open portal','#/portal/messages'],['Email','hello@ora.health \u00B7 replies within one business day.','',''],['Phone','+1 (415) 555-0134 \u00B7 Mon\u2013Fri 8:00\u201318:00 PT','',''],['Clinics','Three locations \u00B4 walk-ins for members.','Find a clinic','#/clinics']].map(c=>`<div data-rv style="border-top:1px solid var(--line);padding:20px 0;display:flex;justify-content:space-between;gap:16px;align-items:center"><div><h4 style="font-size:15px;margin-bottom:4px">${c[0]}</h4><p class="meta">${c[1]}</p></div>${c[3]?`<a class="link" href="${c[3]}">${c[2]} ${AR}</a>`:''}</div>`).join('')}
  </div>
  <div class="card card-pad" data-rv id="cform-box" style="padding:32px">
   <h3 class="h-sm" style="margin-bottom:18px">Send a message</h3>
   <div class="field"><label>Topic</label><select class="select"><option>Membership & billing</option><option>Results question</option><option>Appointments</option><option>Employers</option><option>Something else</option></select></div>
   <div class="field"><label>Email</label><input class="input" type="email" placeholder="you@example.com"></div>
   <div class="field"><label>Message</label><textarea class="input" rows="5" placeholder="How can we help?"></textarea></div>
   <button class="btn btn-primary" id="c-send" style="width:100%;justify-content:center">Send message ${AR}</button>
   <p class="note" style="margin-top:12px">Please don\u2019t include detailed medical information here \u2014 use secure messaging in the portal instead.</p>
  </div></div>
</section>`,
after:()=>{$('#c-send').onclick=()=>{$('#cform-box').innerHTML=`<div style="text-align:center;padding:40px 10px"><div class="avatar" style="width:56px;height:56px;margin:0 auto 16px;background:var(--ok-bg);color:var(--ok)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m5 12 5 5L20 7"/></svg></div><h3 class="h-sm">Message received.</h3><p class="meta" style="margin:10px auto 0;max-width:32ch">We reply within one business day \u2014 usually sooner, never louder.</p></div>`;toast('Message sent. Thank you.');};}};

/* ================= APP ================= */
VIEWS.app={render:()=>`
<section class="wrap" style="padding-top:150px">
 ${EB('01','The ORA app')}
 <div class="grid2" style="margin-top:26px;align-items:center">
  <div><h1 class="h-lg" data-split data-rv="split">Your pocket, but <em>calmer.</em></h1>
  <p class="lead" data-rv style="margin:22px 0 30px;max-width:44ch">The full portal in your pocket \u2014 check-ins that take a minute, results that explain themselves, and appointments without phone calls.</p>
  <div data-rv style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-primary btn-lg" onclick="toast('Opening the App Store\u2026')">App Store</button><button class="btn btn-line btn-lg" onclick="toast('Opening Google Play\u2026')">Google Play</button></div>
  <p class="note" data-rv style="margin-top:20px">iOS 16+ \u00B7 Android 12+ \u00B7 End-to-end encrypted sync.</p></div>
  <div data-rv="img"><div class="imgwrap" style="aspect-ratio:1/1"><img loading="lazy" src="${IMG.app}" alt="A hand holding a phone with the calm ORA app" data-px="0.05"></div></div></div>
</section>
<section class="sec wrap sec-line">
 <div class="grid2" style="align-items:center">
  <div class="phone" data-rv><div class="scr"><div class="notch"></div>
   <div style="font-family:var(--serif);font-size:20px">Good morning, Alex</div>
   <div class="meta">Tuesday \u00B7 how are you today?</div>
   <div class="card card-pad" style="padding:16px"><div class="meta" style="font-weight:600">Sleep</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><b>Rested</b><span class="meta">6h 50m</span></div></div>
   <div class="card card-pad" style="padding:16px"><div class="meta" style="font-weight:600">Energy</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><b>Steady</b><span class="meta">afternoon dip ok</span></div></div>
   <div class="card card-pad" style="padding:16px;background:var(--forest);border-color:var(--forest);color:#EDEBE2"><b style="font-size:14px">Check-in saved \u2713</b><p class="meta" style="color:#A8B2A2;margin-top:4px">See you tomorrow. No streaks, no pressure.</p></div>
  </div></div>
  <div>${EB('02','Designed for moments, not sessions')}
   <div style="margin-top:26px;display:flex;flex-direction:column">${[['One-minute check-ins','Five gentle sliders. No points, no badges, no confetti.'],['Results with context','Reference ranges and trends, readable on a small screen.'],['Secure messaging','Encrypted conversations with your care team.'],['Offline-first reports','Your health report, available anywhere \u2014 even in a clinic lobby.']].map(f=>`<div data-rv style="display:flex;gap:14px;padding:16px 0;border-top:1px solid var(--line)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--sage2)" stroke-width="2" stroke-linecap="round" style="flex:none;margin-top:3px"><path d="m5 12 5 5L20 7"/></svg><div><h4 style="font-size:14.5px;margin-bottom:3px">${f[0]}</h4><p class="meta">${f[1]}</p></div></div>`).join('')}</div></div>
 </div>
</section>
${footCTA()}`};

/* ================= PORTAL: OVERVIEW ================= */
VIEWS.overview={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1 id="greet">Good morning, Alex</h1><p class="sub" id="greet-date"></p></div>
 <div style="display:flex;gap:10px"><a class="btn btn-line btn-sm" href="#/portal/report">Health report</a><a class="btn btn-primary btn-sm" href="#/portal/book">Book appointment ${AR}</a></div></div>
 <div id="ov-skel"><div class="pgrid"><div class="pcol"><div class="skel" style="height:280px"></div><div class="skel" style="height:220px"></div></div><div class="pcol"><div class="skel" style="height:160px"></div><div class="skel" style="height:240px"></div></div></div></div>
 <div id="ov-body" hidden></div></div>`,
after:()=>{
 const h=new Date().getHours();$('#greet').textContent=(h<12?'Good morning':h<18?'Good afternoon':'Good evening')+', Alex';
 $('#greet-date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+' \u00B7 Here\u2019s your health overview.';
 setTimeout(()=>{$('#ov-skel').hidden=true;const b=$('#ov-body');b.hidden=false;b.innerHTML=`
 <div class="mgrid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px">${[['Sleep avg','6h 48m',[6.1,6.2,6.4,6.5,6.7,6.8],'+42 min this month'],['Resting HR','62 bpm',[66,65,64,63,62,62],'Stable 6 weeks'],['Vitamin D','34 ng/mL',[26,28,30,31,33,34],'Within range']].map(m=>`<div class="card card-pad hover" style="cursor:pointer" onclick="location.hash='#/portal/trends'"><div style="display:flex;justify-content:space-between"><span class="meta" style="font-weight:600">${m[0]}</span>${sparkSVG(m[2],{w:90,h:26})}</div><div class="metric num" style="margin-top:12px;font-size:30px">${m[1]}</div><p class="meta" style="margin-top:8px">${m[3]}</p></div>`).join('')}</div>
 <div class="pgrid"><div class="pcol">
  <div class="card card-pad"><h3 class="sect-title">Health overview</h3>${OVERVIEW.map(c=>`<div class="hcat"><div><h4>${c.cat}</h4><p>${c.why}</p></div><span class="badge ${c.status==='ok'?'b-ok':'b-warn'}"><i></i>${c.label}</span></div>`).join('')}<p class="note" style="margin-top:16px">Statuses summarize context, not a score. You are more than one number.</p></div>
  <div class="card card-pad"><h3 class="sect-title">Insights</h3>${INSIGHTS.map(i=>`<div style="padding:14px 0;border-bottom:1px solid var(--line2)"><p style="font-size:14px;font-weight:600;margin-bottom:6px">${i.t}</p><p class="meta" style="margin-bottom:4px"><b style="color:var(--sage2)">Why it may matter \u00B7</b> ${i.why}</p><p class="meta"><b style="color:var(--sage2)">Next step \u00B7</b> ${i.next}</p></div>`).join('')}<p class="note" style="margin-top:14px">Insights are informational, not a diagnosis.</p></div>
  <div class="card card-pad"><h3 class="sect-title">Recent results</h3>${['vitd','ferritin','glucose'].map(id=>{const r=RESULTS.find(x=>x.id===id);return `<div class="hcat" style="cursor:pointer" onclick="openDrawer('${id}')"><div><h4>${r.name}</h4><p>${r.date} \u00B7 ${r.trend}</p></div><div style="text-align:right"><span class="num" style="font-weight:650">${r.display}</span> <span class="meta">${r.unit}</span><div style="margin-top:6px">${badge(r.status)}</div></div></div>`;}).join('')}<a class="link" href="#/portal/results" style="margin-top:14px">All results ${AR}</a></div>
 </div><div class="pcol">
  <div class="card card-pad"><h3 class="sect-title">Upcoming</h3><div style="display:flex;gap:12px;align-items:center"><span class="avatar"><img src="${IMG.chen}" alt=""></span><div><p style="font-weight:600;font-size:14px">Dr. Maya Chen</p><p class="meta">Thu, Sep 3 \u00B7 14:30 \u00B7 Video</p></div></div><div style="display:flex;gap:8px;margin-top:14px"><a class="btn btn-line btn-sm" href="#/portal/appointments">Manage</a><a class="btn btn-ghost btn-sm" href="#/portal/checkin">Daily check-in</a></div></div>
  <div class="card card-pad"><h3 class="sect-title">Recommended actions</h3>${[{t:'Review your ferritin result',d:'Slightly below range \u2014 see context and questions.',a:'open:ferritin'},{t:'Book your annual preventive consultation',d:'Last visit was Feb 2026.',a:'#/portal/book'},{t:'Complete this week\u2019s check-in',d:'Takes about a minute.',a:'#/portal/checkin'}].map(x=>`<div style="padding:12px 0;border-bottom:1px solid var(--line2)"><a style="display:block" ${x.a.startsWith('#')?`href="${x.a}"`:`href="javascript:void(0)" onclick="openDrawer('${x.a.slice(5)}')"`}><p style="font-size:14px;font-weight:600">${x.t}</p><p class="meta">${x.d}</p></a></div>`).join('')}</div>
  <div class="card card-pad" style="background:var(--forest2);border-color:var(--forest2)"><h3 class="serif" style="color:#EDEBE2;font-size:18px;font-weight:500">A quiet minute?</h3><p style="color:#A8B2A2;font-size:13px;margin:8px 0 16px">Today\u2019s check-in takes about sixty seconds.</p><a class="btn btn-light btn-sm" href="#/portal/checkin">Start check-in ${AR}</a></div>
 </div></div>`;},550);
}};

/* ================= PORTAL: HEALTH ================= */
VIEWS.health={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Health</h1><p class="sub">Key metrics, read in context. Trends over snapshots.</p></div><a class="link" href="#/portal/results">All results ${AR}</a></div>
 <div class="mgrid">${['bp','rhr','sleep','vitd','glucose','chol'].map(id=>{const r=RESULTS.find(x=>x.id===id);return `<div class="card card-pad mcard hover" style="cursor:pointer" onclick="openDrawer('${id}')"><div class="top"><h4>${r.name}</h4>${badge(r.status)}</div><div class="metric num" style="margin-top:16px">${r.display} <small>${r.unit}</small></div><div class="row"><span class="meta">${r.refText?'Ref: '+r.refText:''}</span>${sparkSVG(r.series,{w:110,h:32,band:r.ref})}</div><div class="ctx">${r.date} \u00B7 ${r.trend}</div></div>`;}).join('')}</div>
 <p class="note" style="margin-top:24px;max-width:72ch">Metrics are informational and shown with reference ranges where appropriate. They are not diagnoses. If something looks unexpected, it may be worth discussing with your clinician.</p></div>`};

/* ================= PORTAL: TRENDS ================= */
VIEWS.trends={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Trends</h1><p class="sub">Your history, honestly drawn. Reference bands included.</p></div>
 <div class="tabs" id="tr-range" style="margin:0"><button class="tabbtn" data-r="3">3M</button><button class="tabbtn on" data-r="6">6M</button><button class="tabbtn" data-r="12">1Y</button></div></div>
 <div class="pgrid" style="grid-template-columns:1fr 1fr"><div class="pcol">
  <div class="card card-pad"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3 class="h-sm">Sleep \u00B7 nightly hours</h3><span class="badge b-warn"><i></i>Improving</span></div><p class="meta" style="margin:8px 0 14px">What changed: +42 minutes over the last month.</p><div id="tr-sleep"></div></div>
  <div class="card card-pad"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3 class="h-sm">Resting heart rate</h3><span class="badge b-ok"><i></i>Stable</span></div><p class="meta" style="margin:8px 0 14px">A gentle decline often tracks with fitness and sleep consistency.</p><div id="tr-rhr"></div></div>
 </div><div class="pcol">
  <div class="card card-pad"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3 class="h-sm">Fasting glucose</h3><span class="badge b-ok"><i></i>Within range</span></div><p class="meta" style="margin:8px 0 14px">Steady within the reference band across the period.</p><div id="tr-glu"></div></div>
  <div class="card card-pad"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3 class="h-sm">Energy \u00B7 from check-ins</h3><span class="badge b-ok"><i></i>Steady</span></div><p class="meta" style="margin:8px 0 14px">Self-reported energy, smoothed weekly. Informational only.</p><div id="tr-en"></div></div>
 </div></div>
 <p class="note" style="margin-top:24px;max-width:72ch">We never exaggerate small changes: axes are scaled to the full reference context, and changes within normal biological variation are labeled \u201Cstable\u201D.</p></div>`,
after:()=>{
 const draw=r=>{const sl=a=>a.slice(-Math.max(3,Math.round(a.length*r/6)));
  $('#tr-sleep').innerHTML=barsSVG(sl([6.1,6.2,6.4,6.5,6.7,6.8,6.6,6.9,6.8,7.0,6.8,6.9]).map(v=>v),{w:460,h:170});
  $('#tr-rhr').innerHTML=trendSVG({series:sl([66,65,64,63,62,62,63,62,62,61,62,62]),labels:['Mar','May','Jul','Aug'],band:[60,100],bandText:'60\u2013100',w:460,h:180});
  $('#tr-glu').innerHTML=trendSVG({series:sl([95,94,93,92,93,92,93,92,92,93,92,92]),labels:['Mar','May','Jul','Aug'],band:[70,99],bandText:'70\u201399',w:460,h:180});
  $('#tr-en').innerHTML=trendSVG({series:sl([2.6,2.8,2.7,3.0,3.1,3.0,3.2,3.1,3.3,3.2,3.4,3.3]),labels:['Mar','May','Jul','Aug'],w:460,h:180,area:true});};
 draw(6);
 $$('#tr-range .tabbtn').forEach(b=>b.onclick=()=>{$$('#tr-range .tabbtn').forEach(x=>x.classList.remove('on'));b.classList.add('on');draw(+b.dataset.r);});
}};

/* ================= PORTAL: CHECK-IN ================= */
VIEWS.checkin={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Daily check-in</h1><p class="sub">A quiet minute to notice how you are doing. No points. No badges.</p></div></div>
 <div class="pgrid"><div class="card card-pad" style="padding:30px">
  ${[['How did you sleep?',['Rough','Okay','Good']],['Energy level?',['Low','Steady','High']],['Stress level?',['High','Some','Calm']],['Movement today?',['None','Some','Active']],['Nutrition today?',['Light','Balanced','Nourished']]].map((r,i)=>`<div style="padding:16px 0;border-bottom:1px solid var(--line2)"><div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-bottom:12px"><span>${r[0]}</span><span id="ckv${i}" style="color:var(--sage2)">${r[1][1]}</span></div><input type="range" min="0" max="2" value="1" step="1" data-i="${i}" data-l='${JSON.stringify(r[1])}' class="ckr" aria-label="${r[0]}"></div>`).join('')}
  <button class="btn btn-primary" id="ck-save" style="margin-top:22px;width:100%;justify-content:center">Save check-in</button>
  <p class="note" style="margin-top:14px">Check-ins are private to you and, if you choose, your care team.</p>
 </div>
 <div class="pcol">
  <div class="card card-pad"><h3 class="sect-title">Consistency \u00B7 last 12 weeks</h3><div class="heat" id="heat"></div><div style="display:flex;justify-content:space-between;margin-top:12px" class="meta"><span>Less</span><span style="display:flex;gap:4px;align-items:center"><i style="width:10px;height:10px;border-radius:3px;background:var(--line2);display:inline-block"></i><i style="width:10px;height:10px;border-radius:3px;background:#DCE3CD;display:inline-block"></i><i style="width:10px;height:10px;border-radius:3px;background:#BCCBA8;display:inline-block"></i><i style="width:10px;height:10px;border-radius:3px;background:var(--sage2);display:inline-block"></i></span><span>More</span></div><p class="meta" style="margin-top:12px">84 check-ins in 84 days \u2014 a gentle, honest rhythm.</p></div>
  <div class="card card-pad"><h3 class="sect-title">Weekday pattern \u00B7 sleep</h3>${barsSVG([6.4,6.5,6.6,6.7,6.9,7.4,7.2],{w:380,h:150})}<p class="meta" style="margin-top:10px">Weekends run longer \u2014 a common, useful signal.</p></div>
 </div></div></div>`,
after:()=>{
 $$('.ckr').forEach(r=>r.addEventListener('input',()=>{const l=JSON.parse(r.dataset.l);$('#ckv'+r.dataset.i).textContent=l[+r.value];}));
 $('#ck-save').onclick=e=>{e.target.textContent='Saved for today \u2713';e.target.disabled=true;toast('Check-in saved. Thank you for noticing.');};
 const heat=$('#heat');let s=7;let html='';for(let i=0;i<84;i++){s=(s*16807)%2147483647;const v=s%10;html+=`<div class="${v>7?'l3':v>5?'l2':v>3?'l1':''}"></div>`;}heat.innerHTML=html;
}};

/* ================= PORTAL: RESULTS ================= */
let resTab='All';
VIEWS.results={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Your results</h1><p class="sub">Every result, with its reference range and history.</p></div>
 <div style="display:flex;gap:8px"><button class="iconbtn" id="res-refresh" aria-label="Refresh" style="border:1px solid var(--line)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 11a8 8 0 1 0-2.3 6.3M20 5v6h-6"/></svg></button><button class="btn btn-line btn-sm" id="res-archive">Load archived</button></div></div>
 <div class="tabs" id="res-tabs"></div>
 <div id="res-body" class="card" style="overflow:hidden"></div>
 <div id="res-archive-box" style="margin-top:20px"></div></div>`,
after:()=>{renderResults('All');
 $('#res-refresh').onclick=()=>{renderResults(resTab);toast('Results are up to date.');};
 $('#res-archive').onclick=()=>{const box=$('#res-archive-box');box.innerHTML=`<div class="empty" style="border-color:#E8D5CF;background:#FDFAF8"><div class="eic" style="background:var(--crit-bg);color:var(--crit)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg></div><h4>We couldn\u2019t load your results.</h4><p>Something went wrong on our side. Your data is safe \u2014 please try again.</p><div style="display:flex;gap:10px;justify-content:center"><button class="btn btn-primary btn-sm" id="arc-retry">Try again</button><button class="btn btn-line btn-sm" id="arc-sup">Contact support</button></div></div>`;
  $('#arc-sup').onclick=()=>toast('Support has been notified and will reach out shortly.');
  $('#arc-retry').onclick=()=>{box.innerHTML=`<div class="card card-pad"><div class="skel" style="height:14px;width:40%;margin-bottom:12px"></div><div class="skel" style="height:14px;margin-bottom:8px"></div><div class="skel" style="height:14px"></div></div>`;setTimeout(()=>{box.innerHTML=`<div class="card card-pad"><h3 class="sect-title">Archive \u00B7 2025</h3>${[['Vitamin D','26 ng/mL','Within range \u00B7 Aug 2025'],['Fasting glucose','95 mg/dL','Within range \u00B7 Aug 2025'],['Lipid panel','196 mg/dL','Within range \u00B7 Aug 2025']].map(a=>`<div class="kv"><span class="k">${a[0]}</span><span class="v num">${a[1]} <span class="meta" style="font-weight:400">\u00B7 ${a[2]}</span></span></div>`).join('')}</div>`;toast('Archive loaded.');},700);};};
}};
function renderResults(tab){resTab=tab;const tabs=['All','Blood','Metabolic','Nutrients','Hormones','Other'];
 $('#res-tabs').innerHTML=tabs.map(t=>`<button class="tabbtn ${t===tab?'on':''}" data-t="${t}">${t}</button>`).join('');
 $$('#res-tabs .tabbtn').forEach(b=>b.onclick=()=>renderResults(b.dataset.t));
 const body=$('#res-body');
 body.innerHTML=`<div style="padding:20px">${[...Array(5)].map(()=>`<div style="display:flex;gap:14px;margin-bottom:16px"><div class="skel" style="height:16px;flex:2"></div><div class="skel" style="height:16px;flex:1"></div><div class="skel" style="height:16px;flex:1"></div></div>`).join('')}</div>`;
 setTimeout(()=>{const list=RESULTS.filter(r=>tab==='All'||r.cat===tab);
 if(!list.length){body.innerHTML=`<div style="padding:26px"><div class="empty"><div class="eic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 3h6M10 3v6.3L4.8 18a2.4 2.4 0 0 0 2.1 3.5h10.2a2.4 2.4 0 0 0 2.1-3.5L14 9.3V3"/></svg></div><h4>No results here yet</h4><p>When new results arrive in this category, they will appear with full context.</p><a class="btn btn-line btn-sm" href="#/portal/book">Schedule diagnostics</a></div></div>`;return;}
 body.innerHTML=`<div style="overflow-x:auto"><table class="res"><thead><tr><th>Test</th><th class="hide-s">Date</th><th>Result</th><th class="hide-s">Reference</th><th>Status</th></tr></thead><tbody>${list.map(r=>`<tr class="rowline" tabindex="0" data-id="${r.id}" aria-label="Open ${r.name}"><td style="font-weight:600">${r.name}</td><td class="hide-s meta">${r.date}</td><td><span class="val">${r.display}</span><span class="unit">${r.unit}</span></td><td class="hide-s meta num">${r.refText}</td><td>${badge(r.status)}</td></tr>`).join('')}</tbody></table></div><p class="note" style="padding:14px 18px">Select a result for context, history and questions for your clinician. Reference ranges can vary.</p>`;
 body.querySelectorAll('tr.rowline').forEach(tr=>{tr.onclick=()=>openDrawer(tr.dataset.id);tr.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openDrawer(tr.dataset.id);}};});},380);}

/* ================= PORTAL: PROGRAMS ================= */
VIEWS.pprograms={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Programs</h1><p class="sub">Personalized wellness programs with expert support.</p></div></div>
 <div class="prog-grid">${PROGRAMS.map(p=>`<div class="card hover" style="padding:26px;display:flex;flex-direction:column">
  <div style="display:flex;justify-content:space-between;align-items:center"><span class="badge b-line">${p.weeks}</span>${p.progress===100?'<span class="badge b-ok"><i></i>Completed</span>':p.progress>0?`<span class="badge b-neutral num">${p.progress}%</span>`:'<span class="badge b-line">Not started</span>'}</div>
  <h3 class="h-sm" style="margin:16px 0 6px">${p.name}</h3><p class="meta" style="margin-bottom:12px">Focus \u00B7 ${p.focus}</p>
  <p class="meta" style="line-height:1.65;margin-bottom:18px;flex:1">${p.desc}</p>
  <div class="pbar2"><i style="width:${p.progress}%"></i></div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px"><span class="meta">${p.expert}</span><a class="link" href="#/portal/program/${p.id}">Explore ${AR}</a></div></div>`).join('')}</div></div>`};
VIEWS.program={render:(id)=>{const p=PROGRAMS.find(x=>x.id===id)||PROGRAMS[0];return `<div class="pwrap">
 <a class="link" href="#/portal/programs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="transform:rotate(180deg)"><path d="M5 12h14m-6-6 6 6-6 6"/></svg> All programs</a>
 <div class="card card-pad" style="margin-top:22px;padding:38px 42px">
  <div style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:flex-start">
   <div style="max-width:56ch"><span class="badge b-line">${p.weeks}</span><h1 class="serif" style="font-size:36px;font-weight:500;margin:14px 0 10px;letter-spacing:-.015em">${p.name}</h1><p style="color:var(--gray)">${p.desc}</p></div>
   <div style="text-align:right"><p class="meta">Expert support</p><p style="font-weight:600;font-size:14px">${p.expert}</p><p class="meta" style="margin-top:10px">Focus</p><p style="font-weight:600;font-size:14px">${p.focus}</p></div></div>
  <div class="pbar2" style="margin-top:26px;max-width:340px"><i style="width:${p.progress}%"></i></div><p class="meta" style="margin-top:8px">${p.progress}% complete</p>
  <div class="wkline">${p.weeksPlan.map((w,i)=>`<div class="wk ${p.progress>=(i+1)*25?'done':''}"><span class="wn">${w.n}</span><h4>${w.t}</h4><p>${w.d}</p></div>`).join('')}</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:26px">${p.incl.map(x=>`<span class="badge b-line">${x}</span>`).join('')}</div>
  <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-primary" onclick="toast('Your coach will follow up this week.')">${p.progress>0&&p.progress<100?'Continue program':p.progress===100?'Review program':'Start program'}</button><button class="btn btn-line" onclick="toast('Check-in with your expert requested.')">Request check-in</button></div>
 </div></div>`;}};

/* ================= PORTAL: APPOINTMENTS / BOOK ================= */
VIEWS.appointments={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Appointments</h1><p class="sub">Upcoming and past visits.</p></div><a class="btn btn-primary btn-sm" href="#/portal/book">Book appointment ${AR}</a></div>
 <div id="appt-body"></div></div>`,after:()=>renderAppts()};
function renderAppts(){const b=$('#appt-body');
 b.innerHTML=`<h3 class="sect-title">Upcoming</h3>${APPTS.length?APPTS.map(a=>`<div class="card card-pad" style="padding:24px 28px;margin-bottom:14px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">
  <span class="avatar" style="width:48px;height:48px"><img src="${a.img||''}" alt=""></span>
  <div style="flex:1;min-width:200px"><p style="font-weight:650;font-size:15px">${a.who}</p><p class="meta">${a.what}</p><p class="meta" style="margin-top:4px"><b style="color:var(--ink2)">${a.when} \u00B7 ${a.time}</b> \u00B7 ${a.where}</p></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" onclick="toast('The video room opens 5 minutes before your visit.')">Join</button><button class="btn btn-line btn-sm" onclick="location.hash='#/portal/book'">Reschedule</button><button class="btn btn-danger btn-sm" data-cancel="${a.id}">Cancel</button></div></div>`).join(''):`<div class="empty"><h4>No upcoming appointments</h4><p>When you book a visit, it will appear here with joining details.</p><a class="btn btn-primary btn-sm" href="#/portal/book">Book appointment</a></div>`}
 <h3 class="sect-title" style="margin-top:32px">Past</h3>
 <div class="empty"><div class="eic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div><h4>No past visits yet</h4><p>Your visit history will build here over time, alongside your results.</p></div>`;
 b.querySelectorAll('[data-cancel]').forEach(btn=>btn.onclick=()=>{openModal(`<div style="padding:30px"><h3 class="serif" style="font-size:22px;font-weight:500;margin-bottom:8px">Cancel this appointment?</h3><p class="meta" style="margin-bottom:22px">You can always book a new time later. No fees apply for cancellations made 24h ahead.</p><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-line btn-sm" onclick="closeModal()">Keep it</button><button class="btn btn-danger btn-sm" id="m-cancel">Cancel appointment</button></div></div>`);$('#m-cancel').onclick=()=>{APPTS=APPTS.filter(x=>x.id!=btn.dataset.cancel);closeModal();renderAppts();toast('Appointment cancelled.');};});}
let BK={step:1,service:null,clin:null,date:null,time:null};
const SERVICES=[['Preventive health consultation','60 min'],['Diagnostics review','30 min'],['Program coaching','45 min'],['Nutrition consult','45 min']];
function nextDays(){const out=[];const d=new Date();for(let i=1;out.length<5;i++){const dt=new Date(d);dt.setDate(d.getDate()+i);if(dt.getDay()!==0&&dt.getDay()!==6)out.push(dt);}return out.map(dt=>dt.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}));}
VIEWS.book={render:()=>`<div class="pwrap" style="max-width:780px">
 <div class="phead"><div><h1>Book an appointment</h1><p class="sub">Five quick steps. No phone calls.</p></div></div><div id="book-root"></div></div>`,after:()=>renderBook()};
function renderBook(){const S=BK.step;
 $('#book-root').innerHTML=`<div class="bk-steps">${['Service','Clinician','Date','Time','Confirm'].map((s,i)=>`<span class="bk-step ${S===i+1?'on':S>i+1?'done':''}"><span class="c">${S>i+1?'\u2713':i+1}</span>${s}</span>`).join('')}</div>
 <div class="card card-pad" style="padding:32px 34px">${(()=>{ 
  if(S===1)return `<div class="optgrid">${SERVICES.map(s=>`<button class="opt ${BK.service===s[0]?'on':''}" data-v="${s[0]}"><h4>${s[0]}</h4><p>${s[1]}</p></button>`).join('')}</div>`;
  if(S===2)return `<div class="optgrid">${CLINICIANS.map(c=>`<button class="opt ${BK.clin===c.id?'on':''}" data-v="${c.id}"><h4>${c.name}</h4><p>${c.role}</p></button>`).join('')}</div>`;
  if(S===3)return `<div class="optgrid" style="grid-template-columns:repeat(5,1fr)">${nextDays().map(d=>`<button class="opt ${BK.date===d?'on':''}" data-v="${d}" style="text-align:center"><h4 style="font-size:13px">${d}</h4></button>`).join('')}</div>`;
  if(S===4)return `<div class="slotgrid">${['09:00','09:30','10:30','11:00','14:30','15:15','16:00','16:45'].map((t,i)=>`<button class="slot ${BK.time===t?'on':''}" data-v="${t}" ${i===2?'disabled':''}>${t}</button>`).join('')}</div><p class="meta" style="margin-top:14px">All times shown in your local timezone.</p>`;
  const c=CLINICIANS.find(x=>x.id===BK.clin);return `<div class="card card-pad" style="background:var(--sage-soft);border-color:#DCE4D2"><div class="kv"><span class="k">Service</span><span class="v">${BK.service}</span></div><div class="kv"><span class="k">Clinician</span><span class="v">${c?c.name:''}</span></div><div class="kv"><span class="k">Date</span><span class="v">${BK.date}</span></div><div class="kv"><span class="k">Time</span><span class="v">${BK.time}</span></div><div class="kv"><span class="k">Location</span><span class="v">ORA Clinic / Video</span></div><p class="note" style="margin-top:12px">Free reschedule or cancellation up to 24 hours before your visit.</p></div>`;})()}
 <div style="display:flex;justify-content:space-between;margin-top:28px">${S>1?`<button class="btn btn-line" id="bk-back">Back</button>`:'<span></span>'}${S<5?`<button class="btn btn-primary" id="bk-next" ${![BK.service,BK.clin,BK.date,BK.time][S-1]?'disabled':''}>Continue ${AR}</button>`:`<button class="btn btn-primary" id="bk-confirm">Confirm appointment</button>`}</div></div>`;
 $('#book-root').querySelectorAll('.opt,.slot').forEach(o=>o.onclick=()=>{const v=o.dataset.v;[()=>BK.service=v,()=>BK.clin=v,()=>BK.date=v,()=>BK.time=v][S-1]();renderBook();});
 const nb=$('#bk-back');if(nb)nb.onclick=()=>{BK.step--;renderBook();};
 const nn=$('#bk-next');if(nn)nn.onclick=()=>{BK.step++;renderBook();};
 const cf=$('#bk-confirm');if(cf)cf.onclick=()=>{const c=CLINICIANS.find(x=>x.id===BK.clin);APPTS.unshift({id:Date.now(),who:c.name,img:c.img||IMG.chen,what:BK.service,when:BK.date,time:BK.time,where:'ORA Clinic / Video'});BK={step:1,service:null,clin:null,date:null,time:null};toast('Appointment confirmed. See you soon.');location.hash='#/portal/appointments';};}

/* ================= PORTAL: MESSAGES ================= */
let curThread='care';
VIEWS.messages={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Messages</h1><p class="sub">Private conversations with your care team.</p></div><span class="secure-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>End-to-end encrypted</span></div>
 <div class="msg-wrap"><div class="msg-list" id="msg-list"></div><div class="msg-main" id="msg-main"></div></div></div>`,after:()=>renderMsgs('care')};
function renderMsgs(id){curThread=id;
 $('#msg-list').innerHTML=THREADS.map(t=>`<button class="${t.id===id?'on':''}" data-th="${t.id}"><span class="avatar">${t.name[0]}</span><span style="min-width:0"><span style="font-weight:600;font-size:14px;display:block">${t.name}</span><span style="font-size:12.5px;color:var(--gray);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px">${t.msgs.length?t.msgs[t.msgs.length-1].t:'No messages yet'}</span></span></button>`).join('');
 $$('#msg-list button').forEach(b=>b.onclick=()=>renderMsgs(b.dataset.th));
 const th=THREADS.find(t=>t.id===id),main=$('#msg-main');
 const head=`<div class="msg-head"><span class="avatar">${th.name[0]}</span><div><p style="font-weight:650;font-size:14px">${th.name}</p><p class="meta">${th.sub} \u00B7 replies within 1 business day</p></div><span class="secure-chip" style="margin-left:auto"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Secure</span></div>`;
 const comp=`<div class="msg-comp"><button class="iconbtn" id="m-att" aria-label="Attach"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m21 12-8.5 8.5a5 5 0 0 1-7-7L14 5a3.4 3.4 0 0 1 4.8 4.8L10.5 18a1.8 1.8 0 0 1-2.5-2.5L15.5 8"/></svg></button><input class="input" id="m-in" placeholder="Write a secure message\u2026" aria-label="Message"><button class="btn btn-primary" id="m-send" style="border-radius:50%;width:42px;height:42px;padding:0;justify-content:center" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z"/></svg></button></div>`;
 if(!th.msgs.length){main.innerHTML=head+`<div style="flex:1;display:flex;align-items:center;justify-content:center;padding:30px"><div class="empty" style="border:none;background:transparent"><div class="eic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M21 12a8 8 0 0 1-8 8H4l1.7-3.4A8 8 0 1 1 21 12Z"/></svg></div><h4>No messages yet</h4><p>Start the conversation \u2014 your ${th.name.toLowerCase()} typically replies within one business day.</p></div></div>`+comp;wireComp();return;}
 main.innerHTML=head+`<div class="msg-body" id="msg-body">${th.msgs.map(m=>`<div class="bubble ${m.me?'me':'them'}">${esc(m.t)}<span class="st">${m.s}${m.me?' \u00B7 Read \u2713\u2713':''}</span></div>`).join('')}</div>`+comp;
 const mb=$('#msg-body');mb.scrollTop=mb.scrollHeight;wireComp();}
function wireComp(){const att=$('#m-att');if(att)att.onclick=()=>toast('Attachments are encrypted and scanned before upload.');
 const send=$('#m-send'),inp=$('#m-in');
 if(send)send.onclick=()=>{const v=inp.value.trim();if(!v)return;const th=THREADS.find(t=>t.id===curThread);const now=new Date().toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});th.msgs.push({me:1,t:v,s:now+' \u00B7 Sent \u2713'});inp.value='';renderMsgs(curThread);setTimeout(()=>{th.msgs[th.msgs.length-1].s=now+' \u00B7 Read \u2713\u2713';if(curThread===th.id)renderMsgs(curThread);},1600);};
 if(inp)inp.addEventListener('keydown',e=>{if(e.key==='Enter')send.onclick();});}

/* ================= PORTAL: DOCUMENTS ================= */
VIEWS.documents={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Documents</h1><p class="sub">Your records, organized and portable.</p></div></div>
 <div class="tabs" id="doc-tabs"></div><div id="doc-body" class="card card-pad" style="padding:10px 26px"></div></div>`,after:()=>renderDocs('All')};
function renderDocs(cat){const cats=['All','Lab results','Care plans','Invoices','Letters','Reports'];
 $('#doc-tabs').innerHTML=cats.map(c=>`<button class="tabbtn ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
 $$('#doc-tabs .tabbtn').forEach(b=>b.onclick=()=>renderDocs(b.dataset.c));
 const body=$('#doc-body');
 body.innerHTML=`<div style="padding:16px">${[...Array(4)].map(()=>`<div style="display:flex;gap:14px;margin-bottom:16px;align-items:center"><div class="skel" style="width:40px;height:40px;border-radius:10px"></div><div style="flex:1"><div class="skel" style="height:14px;width:50%;margin-bottom:8px"></div><div class="skel" style="height:12px;width:30%"></div></div></div>`).join('')}</div>`;
 setTimeout(()=>{const list=DOCS.filter(d=>cat==='All'||d.cat===cat);
 if(!list.length){body.innerHTML=`<div style="padding:24px"><div class="empty"><div class="eic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/></svg></div><h4>No ${cat.toLowerCase()} yet</h4><p>When a document of this type is added to your record, it will appear here.</p></div></div>`;return;}
 body.innerHTML=list.map(d=>`<div class="docrow"><span class="dic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/></svg></span><div><p class="nm">${d.name}</p><p class="mt">${d.cat} \u00B7 ${d.date} \u00B7 ${d.type}</p></div><div class="acts"><button class="btn btn-line btn-sm" data-view="${esc(d.name)}">View</button><button class="iconbtn" data-dl="${esc(d.name)}" aria-label="Download"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg></button></div></div>`).join('');
 body.querySelectorAll('[data-dl]').forEach(b=>b.onclick=()=>toast('Download started \u2014 '+b.dataset.dl));
 body.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>openModal(`<div style="padding:32px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><span class="logo"><svg class="mark" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="11" stroke="#22402E" stroke-width="2"/><circle cx="13" cy="13" r="4.5" fill="#8CA07E"/></svg>ORA&nbsp;<em>HEALTH</em></span><button class="iconbtn" onclick="closeModal()" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><h3 class="serif" style="font-size:22px;font-weight:500;margin-bottom:4px">${b.dataset.view}</h3><p class="meta" style="margin-bottom:20px">Secure preview \u00B7 watermarked for your privacy</p><div class="skel" style="height:12px;margin-bottom:10px"></div><div class="skel" style="height:12px;margin-bottom:10px"></div><div class="skel" style="height:12px;width:70%;margin-bottom:24px"></div><div class="skel" style="height:130px;margin-bottom:24px"></div><div class="skel" style="height:12px;width:55%"></div><p class="note" style="margin-top:22px">Full document available in the mobile app and desktop portal.</p></div>`));},500);}

/* ================= PORTAL: BILLING ================= */
VIEWS.billing={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Billing</h1><p class="sub">Balances, payments and invoices.</p></div></div><div id="bill-body"></div></div>`,after:()=>renderBill()};
function renderBill(){$('#bill-body').innerHTML=`<div class="pgrid" style="grid-template-columns:1fr 1.3fr">
 <div class="pcol"><div class="card card-pad" style="background:var(--forest2);border-color:var(--forest2)"><p class="meta" style="color:#A8B2A2">Outstanding balance</p><p class="metric num" style="color:#EDEBE2;margin-top:10px">$${BILL.balance.toFixed(2)}</p><p class="meta" style="color:#A8B2A2;margin-top:8px">Diagnostics co-pay \u00B7 Invoice #1042</p><button class="btn btn-light btn-sm" style="margin-top:20px" id="pay-now" ${BILL.balance?'':'disabled'}>${BILL.balance?'Pay now':'All settled \u2713'}</button></div>
 <div class="card card-pad"><h3 class="sect-title">Payment methods</h3><div class="kv"><span class="k">Visa \u00B7\u00B7 4821</span><span class="v">Default</span></div><div class="kv"><span class="k">Apple Pay</span><span class="v"></span></div><button class="btn btn-ghost btn-sm" style="margin-top:10px" onclick="toast('Card management is available in the mobile app.')">Add method</button></div></div>
 <div class="pcol"><div class="card card-pad"><h3 class="sect-title">Recent payments</h3>${BILL.payments.map(p=>`<div class="kv"><span class="k">${p.d} \u00B7 ${p.m}</span><span class="v num">${p.a}</span></div>`).join('')||'<p class="meta">No payments yet.</p>'}</div>
 <div class="card card-pad"><h3 class="sect-title">Invoices</h3>${BILL.invoices.map(i=>`<div class="kv"><span class="k">Invoice ${i.n} \u00B7 ${i.d}</span><span class="v num">${i.a} <span class="badge ${i.s==='Open'?'b-warn':'b-ok'}" style="margin-left:6px"><i></i>${i.s}</span></span></div>`).join('')}</div></div></div>`;
 const pn=$('#pay-now');if(pn)pn.onclick=()=>{openModal(`<div style="padding:30px"><h3 class="serif" style="font-size:22px;font-weight:500;margin-bottom:4px">Pay $${BILL.balance.toFixed(2)}</h3><p class="meta" style="margin-bottom:22px">Invoice #1042 \u00B7 Diagnostics co-pay</p><div class="kv"><span class="k">Visa \u00B7\u00B7 4821</span><span class="v">Default</span></div><div style="display:flex;gap:10px;justify-content:flex-end;margin-top:24px"><button class="btn btn-line btn-sm" onclick="closeModal()">Not now</button><button class="btn btn-primary btn-sm" id="m-pay">Pay securely</button></div></div>`);
 $('#m-pay').onclick=e=>{e.target.textContent='Processing\u2026';e.target.disabled=true;setTimeout(()=>{BILL.balance=0;BILL.payments.unshift({d:'Sep 1, 2026',a:'-$145.00',m:'Visa \u00B7\u00B7 4821'});BILL.invoices[0].s='Paid';closeModal();renderBill();toast('Payment received. Thank you.');},900);};};}

/* ================= PORTAL: PROFILE ================= */
VIEWS.profile={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Profile</h1><p class="sub">Your information and preferences.</p></div></div><div id="profile-body"></div></div>`,after:()=>{
 const mask=v=>`<span class="mask" style="letter-spacing:.12em">\u2022\u2022\u2022\u2022</span> <span data-real="${esc(v)}" style="display:none">${esc(v)}</span>`;
 $('#profile-body').innerHTML=`<div class="pgrid" style="grid-template-columns:1fr 1fr">
 <div class="pcol">
  <div class="card card-pad"><h3 class="sect-title">Personal information</h3>
   <div class="kv"><span class="k">Full name</span><span class="v">Alex Rivera</span></div>
   <div class="kv"><span class="k">Date of birth</span><span class="v sens">${mask('Mar 14, 1988')}</span></div>
   <div class="kv"><span class="k">Email</span><span class="v sens">${mask('alex.rivera@example.com')}</span></div>
   <div class="kv"><span class="k">Phone</span><span class="v sens">${mask('+1 415 555 0132')}</span></div>
   <button class="btn btn-ghost btn-sm" style="margin-top:12px" data-reveal>Reveal sensitive info</button>
   <p class="note" style="margin-top:8px">Sensitive fields stay masked unless you choose to reveal them.</p></div>
  <div class="card card-pad"><h3 class="sect-title">Preferences</h3><div class="kv"><span class="k">Units</span><span class="v">mg/dL (US)</span></div><div class="kv"><span class="k">Language</span><span class="v">English</span></div><div class="kv"><span class="k">Timezone</span><span class="v">America/Los_Angeles</span></div></div>
  <div class="card card-pad"><h3 class="sect-title">Emergency information</h3><div class="kv"><span class="k">Contact</span><span class="v sens">${mask('Jordan Rivera \u00B7 +1 415 555 0177')}</span></div><div class="kv"><span class="k">Allergies</span><span class="v">None on record</span></div><button class="btn btn-ghost btn-sm" style="margin-top:12px" data-reveal>Reveal</button></div></div>
 <div class="pcol">
  <div class="card card-pad"><h3 class="sect-title">Communication</h3>${[['Email summaries','Weekly digest of insights and results',1],['SMS reminders','Appointment and check-in reminders',1],['Product updates','Occasional, calm, no noise',0]].map(c=>`<div class="kv" style="align-items:center"><span><b>${c[0]}</b><br><span class="meta">${c[1]}</span></span><span class="switch"><input type="checkbox" ${c[2]?'checked':''} data-com aria-label="${c[0]}"><span class="tr"></span></span></div>`).join('')}</div>
  <div class="card card-pad"><h3 class="sect-title">Privacy</h3><div class="kv" style="align-items:center"><span><b>Share results with care team</b><br><span class="meta">Dr. Maya Chen and care team only</span></span><span class="switch"><input type="checkbox" checked aria-label="Share"><span class="tr"></span></span></div><div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn btn-line btn-sm" onclick="toast('Your data export will be emailed within 24 hours.')">Download my data</button><button class="btn btn-danger btn-sm" onclick="toast('Account deletion requires confirmation by email.')">Delete account</button></div></div>
  <div class="card card-pad"><h3 class="sect-title">Connected devices</h3><div class="kv"><span class="k">Sleep tracker \u00B7 Ora Ring</span><span class="v badge b-ok"><i></i>Connected</span></div><div class="kv"><span class="k">Activity tracker</span><span class="v badge b-ok"><i></i>Connected</span></div><button class="btn btn-ghost btn-sm" style="margin-top:10px" onclick="toast('Pairing is available in the mobile app.')">Connect device</button></div></div></div>`;
 $$('[data-reveal]').forEach(b=>b.onclick=()=>{const card=b.closest('.card');card.querySelectorAll('.sens').forEach(s=>{const m=s.querySelector('.mask'),r=s.querySelector('[data-real]');const show=r.style.display==='none'||!r.style.display;m.style.display=show?'none':'inline';r.style.display=show?'inline':'none';});b.textContent=b.textContent.startsWith('Reveal')?'Hide sensitive info':'Reveal sensitive info';});
 $$('[data-com]').forEach(c=>c.onchange=()=>toast('Communication preferences updated.'));}};

/* ================= PORTAL: SECURITY ================= */
VIEWS.security={render:()=>`<div class="pwrap">
 <div class="phead"><div><h1>Security</h1><p class="sub">Calm control over your account safety.</p></div></div><div id="sec-body"></div></div>`,after:()=>{
 $('#sec-body').innerHTML=`<div class="pgrid" style="grid-template-columns:1fr 1fr">
 <div class="pcol">
  <div class="card card-pad"><div style="display:flex;justify-content:space-between;align-items:center;gap:14px"><div><h3 style="font-size:15px">Two-factor authentication</h3><p class="meta">Required for all ORA accounts.</p></div><span class="switch"><input type="checkbox" checked id="tfa" aria-label="2FA"><span class="tr"></span></span></div><p class="badge b-ok" style="margin-top:16px"><i></i>Enabled via authenticator app</p></div>
  <div class="card card-pad"><h3 class="sect-title">Password</h3><p class="meta">Last changed 4 months ago.</p><div class="field" style="margin-top:14px"><label>Current password</label><input class="input" type="password" id="pw1"></div><div class="field"><label>New password</label><input class="input" type="password" id="pw2"></div><button class="btn btn-primary btn-sm" id="pw-save">Update password</button></div>
  <div class="card card-pad"><h3 class="sect-title">Security notifications</h3>${[['New sign-in alerts',1],['Result access alerts',1],['Data export alerts',1],['Marketing emails',0]].map(n=>`<div class="kv" style="align-items:center"><span style="font-weight:600">${n[0]}</span><span class="switch"><input type="checkbox" ${n[1]?'checked':''} aria-label="${n[0]}"><span class="tr"></span></span></div>`).join('')}</div></div>
 <div class="pcol">
  <div class="card card-pad"><h3 class="sect-title">Active sessions</h3>${[['This device \u00B7 Safari \u00B7 macOS','San Francisco \u00B7 now',1],['iPhone 15 \u00B7 ORA app','San Francisco \u00B7 2h ago',0],['iPad \u00B7 Safari','Portland \u00B7 6d ago',0]].map((s,i)=>`<div class="kv" style="align-items:center" data-sess><span><b>${s[0]}</b><br><span class="meta">${s[1]}</span></span>${s[2]?'<span class="badge b-ok"><i></i>Current</span>':`<button class="btn btn-line btn-sm" data-rev>Sign out</button>`}</div>`).join('')}</div>
  <div class="card card-pad"><h3 class="sect-title">Login history</h3>${[['Sep 1, 2026 \u00B7 08:12','Safari \u00B7 macOS','Success',''],['Aug 31, 2026 \u00B7 21:40','ORA app \u00B7 iOS','Success',''],['Aug 29, 2026 \u00B7 07:55','Safari \u00B7 macOS','Success',''],['Aug 24, 2026 \u00B7 23:02','Unknown browser','Blocked \u00B7 2FA','1']].map(l=>`<div class="kv"><span class="k">${l[0]} \u00B7 ${l[1]}</span><span class="v" style="font-weight:500;${l[3]?'color:var(--warn);font-weight:600':''}">${l[2]}</span></div>`).join('')}<p class="note" style="margin-top:12px">Unrecognized activity is automatically blocked and requires two-factor approval.</p></div></div></div>`;
 $('#tfa').onchange=e=>toast(e.target.checked?'Two-factor authentication enabled.':'Two-factor disabled \u2014 we recommend keeping it on.');
 $('#pw-save').onclick=()=>{if(!$('#pw1').value||$('#pw2').value.length<8){toast('New password needs at least 8 characters.');return;}$('#pw1').value='';$('#pw2').value='';toast('Password updated.');};
 $$('[data-rev]').forEach(b=>b.onclick=()=>{b.closest('[data-sess]').remove();toast('Session signed out.');});}};

/* ================= PORTAL: REPORT ================= */
VIEWS.report={render:()=>`<div class="pwrap">
 <div class="phead no-print"><div><h1>Personal Health Report</h1><p class="sub">A complete, exportable picture of your health.</p></div><button class="btn btn-line btn-sm" id="rep-print">Print / Save as PDF</button></div>
 <div id="report-root"><div class="report-page">
  <div style="display:flex;justify-content:space-between;align-items:flex-start"><div><span class="logo"><svg class="mark" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="11" stroke="#22402E" stroke-width="2"/><circle cx="13" cy="13" r="4.5" fill="#8CA07E"/></svg>ORA&nbsp;<em>HEALTH</em></span><h1 class="serif" style="font-size:36px;font-weight:500;margin-top:24px">Personal Health Report</h1><p class="meta" style="margin-top:8px">August 2026 \u00B7 Prepared for Alex Rivera</p></div><span class="badge b-neutral">Confidential</span></div>
  <h2>Overview</h2><p style="font-size:14px;color:var(--ink2);line-height:1.75">This report summarizes your results, trends and program activity for August 2026. It is designed to support \u2014 not replace \u2014 conversations with your clinician. Metabolic and heart markers remain steady; sleep is improving; ferritin is slightly below the provided range and may be worth discussing.</p>
  <h2>Results</h2><table><thead><tr><th>Test</th><th>Result</th><th>Reference</th><th>Status</th></tr></thead><tbody>${['vitd','glucose','hba1c','ferritin','rhr','chol'].map(id=>{const r=RESULTS.find(x=>x.id===id);return `<tr><td>${r.name}</td><td class="num" style="font-weight:600">${r.display} ${r.unit}</td><td class="num">${r.refText}</td><td>${r.statusText}</td></tr>`;}).join('')}</tbody></table>
  <h2>Trends</h2><p style="font-size:13px;color:var(--gray);margin-bottom:12px">Vitamin D, last six measurements (ng/mL). Shaded band shows the reference range.</p>
  ${trendSVG({series:[26,28,30,31,33,34],labels:['Feb 25','Aug 25','Dec 25','Mar 26','Jun 26','Aug 26'],band:[20,50],bandText:'20\u201350',w:640,h:220})}
  <h2>Insights</h2><ul style="margin:0 0 10px 18px;font-size:13.5px;color:var(--ink2);line-height:1.9">${INSIGHTS.map(i=>`<li>${i.t}</li>`).join('')}</ul>
  <h2>Recommendations</h2><ul style="margin:0 0 10px 18px;font-size:13.5px;color:var(--ink2);line-height:1.9"><li>Continue the Better Sleep program through week 4 and review trends.</li><li>Discuss ferritin with your clinician at the September consultation.</li><li>Maintain current activity patterns; retest vitamin D in winter if agreed.</li></ul>
  <h2>Questions for your clinician</h2><ul style="margin:0 0 10px 18px;font-size:13.5px;color:var(--ink2);line-height:1.9"><li>Could low ferritin contribute to occasional low energy?</li><li>Is supplementation appropriate, and at what dose?</li><li>What follow-up interval makes sense for vitamin D?</li></ul>
  <p class="note" style="margin-top:36px;border-top:1px solid var(--line2);padding-top:18px">Important: this report is informational and does not constitute a diagnosis or medical advice. Reference ranges can vary between laboratories. Based on the information available at the time of preparation. \u00A9 2026 ORA Health.</p>
 </div></div></div>`,after:()=>{$('#rep-print').onclick=()=>window.print();}};

/* ================= CMD-K & NOTIFS & CHROME ================= */
function buildCmd(){const items=[
 ...[['Home','#/'],['Diagnostics','#/diagnostics'],['Programs','#/programs'],['Pricing','#/pricing'],['Employers','#/employers'],['Insights','#/insights'],['Clinics','#/clinics'],['About','#/about'],['Security','#/security'],['Contact','#/contact'],['The app','#/app']].map(x=>({l:x[0],h:'Page',run:()=>location.hash=x[1]})),
 ...[['Overview','#/portal'],['Health','#/portal/health'],['Trends','#/portal/trends'],['Check-in','#/portal/checkin'],['Results','#/portal/results'],['Portal programs','#/portal/programs'],['Appointments','#/portal/appointments'],['Messages','#/portal/messages'],['Documents','#/portal/documents'],['Billing','#/portal/billing'],['Profile','#/portal/profile'],['Security settings','#/portal/security'],['Health report','#/portal/report'],['Book appointment','#/portal/book']].map(x=>({l:x[0],h:'Portal',run:()=>location.hash=x[1]})),
 {l:'Download health report',h:'Action',run:()=>{location.hash='#/portal/report';}},
 ...RESULTS.map(r=>({l:'Result: '+r.name,h:r.display+' '+r.unit,run:()=>openDrawer(r.id)}))];
 return items;}
let cmdItems=[],cmdIdx=0;
function openCmd(){$('#cmdk').classList.add('on');$('#overlay').classList.add('on');$('#cmdk-in').value='';cmdFilter('');setTimeout(()=>$('#cmdk-in').focus(),30);}
function closeCmd(){$('#cmdk').classList.remove('on');if(!$('#modal').classList.contains('on')&&!$('#drawer').classList.contains('on'))$('#overlay').classList.remove('on');}
function cmdFilter(q){cmdItems=buildCmd().filter(i=>i.l.toLowerCase().includes(q.toLowerCase())).slice(0,9);cmdIdx=0;$('#cmdk-list').innerHTML=cmdItems.map((i,k)=>`<button class="item ${k===0?'on':''}" data-k="${k}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>${esc(i.l)}<span class="hint">${esc(i.h)}</span></button>`).join('')||'<div style="padding:20px" class="meta">Nothing found \u2014 try \u201Cresults\u201D, \u201Cbook\u201D, \u201Csleep\u201D\u2026</div>';
 $$('#cmdk-list .item').forEach(b=>b.onclick=()=>{closeCmd();cmdItems[+b.dataset.k].run();});}
$('#cmdk-in').addEventListener('input',e=>cmdFilter(e.target.value));
$('#cmdk-in').addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const d=e.key==='ArrowDown'?1:-1;cmdIdx=Math.max(0,Math.min(cmdItems.length-1,cmdIdx+d));$$('#cmdk-list .item').forEach((b,k)=>b.classList.toggle('on',k===cmdIdx));}if(e.key==='Enter'&&cmdItems[cmdIdx]){closeCmd();cmdItems[cmdIdx].run();}});
$('#k-open').onclick=openCmd;$('#k-open2').onclick=openCmd;
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCmd();}});
$('#bell').onclick=e=>{e.stopPropagation();const n=$('#notif');if(n){n.remove();return;}const d=document.createElement('div');d.id='notif';d.innerHTML=`<div class="nh"><b style="font-size:14px">Notifications</b><button class="link" id="n-read" style="font-size:12px">Mark all read</button></div>${NOTIFS.map((x,i)=>`<div class="ni ${x.u?'':'read'}"><span class="d"></span><div><b style="font-size:13.5px">${x.t}</b><p class="meta" style="margin-top:3px">${x.d}</p></div></div>`).join('')}`;document.body.appendChild(d);d.querySelector('#n-read').onclick=()=>{NOTIFS.forEach(x=>x.u=0);d.querySelectorAll('.ni').forEach(el=>el.classList.add('read'));toast('All notifications marked as read.');};setTimeout(()=>{const cl=ev=>{if(!d.contains(ev.target)){d.remove();document.removeEventListener('click',cl);}};document.addEventListener('click',cl);},0);};
$('#burger').onclick=()=>$('#mmenu').hidden=false;$('#mclose').onclick=()=>$('#mmenu').hidden=true;$$('#mmenu a').forEach(a=>a.onclick=()=>$('#mmenu').hidden=true);
$('#morebtn').onclick=()=>{$('#msheet').classList.add('open');$('#overlay').classList.add('on');};$$('#msheet a').forEach(a=>a.onclick=()=>{$('#msheet').classList.remove('open');$('#overlay').classList.remove('on');});
document.addEventListener('submit',e=>{if(e.target.id==='nl-form'){e.preventDefault();e.target.reset();toast('Welcome to the monthly letter. First issue arrives next week.');}});

route();

// بعد از render() در app.js
setTimeout(() => {
  // همه محتوای اصلی رو از بالای صفحه جدا کن
  document.querySelectorAll('.main-content, .pwrap').forEach(el => {
    el.style.paddingTop = '70px';
  });
}, 100);