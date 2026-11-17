// ─────────────────────────────────────────────────────────────────────────────
// NEON landing page copy. Arabic is the primary audience and is written first,
// not translated; English follows it.
//
// Rule for everything below: describe only what the product does today. No
// customer counts, uptime figures, testimonials or logos — the product demos
// carry the proof. Names and prices inside the demos belong to one fictional
// oud shop, "Dar Al Oud", so every screen describes the same business.
// ─────────────────────────────────────────────────────────────────────────────

export type LandingLang = 'ar' | 'en'

interface Point { title: string; desc: string }

export interface LandingContent {
  meta: { title: string; description: string; ogAlt: string }
  nav: {
    links: { id: string; label: string }[]
    signIn: string
    cta: string
    menu: string
    close: string
    switchLabel: string
    switchHref: string
    skip: string
  }
  cta: { start: string; question: string }
  hero: {
    eyebrow: string
    title: [string, string]
    brandWord: string
    sub: string
    cta: string
    secondary: string
    note: string
  }
  demo: {
    contact: string
    initial: string
    online: string
    today: string
    m1: string
    m2: string
    m3: string
    t1: string
    t2: string
    t3: string
    aiLabel: string
    typing: string
    composer: string
    card: string
    score: string
    status: string
    signals: string
    s1: string
    s2: string
    owner: string
    ownerName: string
    summary: string
    toastTitle: string
    toastBody: string
    now: string
  }
  trust: { lead: string; items: string[] }
  /** Alt text for the 3D character renders. */
  chars: { hero: string; ai: string; lead: string; campaigns: string; inbox: string; pair: string }
  /** The bold commercial layer: hero, bento, steps and the regional section. */
  sell: {
    kicker: string
    kickerTag: string
    titleHi: string
    titleRest: string
    sub: string
    cta: string
    checks: string[]
    bentoTitle: string
    bentoSub: string
    bento: { inbox: Point; ai: Point; lead: Point; camp: Point }
    stepsTitle: string
    steps: Point[]
    localTitle: string
    localSub: string
    morning: { time: string; suffix: string; title: string; desc: string }
    night: { time: string; suffix: string; title: string; desc: string }
    localPoints: string[]
    appTitle: string
    finalTitle: string
  }
  /** Customer messages that arrive while no one is looking — and the few NEON catches. */
  wall: {
    title: string
    sub: string
    messages: string[]
    lit: { msg: string; tag: string }[]
    demoTitle: string
    demoSub: string
  }
  switch: {
    eyebrow: string
    title: string
    sub: string
    before: string
    after: string
    rows: { before: string; after: string }[]
  }
  inbox: {
    eyebrow: string
    title: string
    titleMuted: string
    sub: string
    points: Point[]
    mock: {
      search: string
      tabs: string[]
      chats: { name: string; msg: string; time: string; unread?: number; tag?: string; hot?: boolean; bot?: boolean }[]
      assignedTo: string
      autoAssigned: string
      botPaused: string
      fahadMsg: string
      fahadTime: string
      contactCard: string
      phone: string
      score: string
      hot: string
      stage: string
      stageValue: string
      tags: string[]
      note: string
      noteBody: string
      noteBy: string
      you: string
    }
  }
  ai: {
    eyebrow: string
    title: string
    titleMuted: string
    sub: string
    rules: {
      title: string
      on: string
      identity: { k: string; v: string }[]
      productsTitle: string
      products: string[]
      rulesTitle: string
      rules: string[]
      handoffTitle: string
      handoff: string[]
      pause: string
    }
    lead: {
      title: string
      sub: string
      name: string
      scoreLabel: string
      status: string
      priority: string
      signalsLabel: string
      signals: { label: string; on: boolean }[]
      summaryLabel: string
      summary: string
      recLabel: string
      rec: string
    }
  }
  day: {
    eyebrow: string
    title: string
    sub: string
    figureMorning: string
    figureNight: string
    moments: { time: string; title: string; desc: string }[]
  }
  campaigns: {
    eyebrow: string
    title: string
    titleMuted: string
    sub: string
    points: Point[]
    mock: {
      name: string
      status: string
      audience: string
      chips: string[]
      recipients: string
      template: string
      approved: string
      progress: string
      stats: { label: string; value: string; pct: number }[]
      failuresTitle: string
      failures: { reason: string; count: string }[]
      limit: string
      limitValue: string
    }
  }
  index: {
    title: string
    sub: string
    groups: { title: string; items: string[] }[]
  }
  mobile: {
    eyebrow: string
    title: string
    sub: string
    points: string[]
    install: string
    hint: string
    installed: string
    phone: { title: string; chats: { name: string; msg: string; time: string; unread?: number }[]; push: string; pushBody: string }
  }
  faq: { eyebrow: string; title: string; sub: string; ask: string; items: { q: string; a: string }[] }
  final: { title: string; sub: string; stepsTitle: string; steps: string[]; cta: string; signIn: string }
  footer: { tagline: string; product: string; account: string; legal: string; rights: string }
  install: {
    homeTitle: string
    desktopTitle: string
    updating: string
    update: string
  }
}

export const LANDING: Record<LandingLang, LandingContent> = {
  // ═══════════════════════════════════════════ العربية ═══════════════════════
  ar: {
    meta: {
      title: 'NEON — نظام إدارة العملاء المبني على واتساب',
      description:
        'رقم واتساب واحد لفريقك كله، ومساعد ذكي يرد على عملائك بقواعدك أنت، وتقييم تلقائي للعملاء الجادّين، وحملات آمنة. نظام إدارة عملاء عربي لشركات السعودية والخليج.',
      ogAlt: 'NEON — كل رسالة فرصة',
    },
    nav: {
      links: [
        { id: 'product', label: 'المنتج' },
        { id: 'ai', label: 'الذكاء الاصطناعي' },
        { id: 'campaigns', label: 'الحملات' },
        { id: 'faq', label: 'الأسئلة الشائعة' },
      ],
      signIn: 'تسجيل الدخول',
      cta: 'ابدأ الآن',
      menu: 'فتح القائمة',
      close: 'إغلاق القائمة',
      switchLabel: 'English',
      switchHref: '/en',
      skip: 'تخطَّ إلى المحتوى',
    },
    cta: {
      start: 'مرحبًا، أرغب في البدء مع NEON',
      question: 'مرحبًا، لدي سؤال عن NEON',
    },
    hero: {
      eyebrow: 'نظام إدارة العملاء المبني على واتساب',
      title: ['كل رسالة فرصة.', 'ونيون لا يترك فرصة في الظلام.'],
      brandWord: 'نيون',
      sub: 'رقم واتساب واحد لفريقك كله، ومساعد ذكي يرد على عملائك بقواعدك أنت في أي ساعة، وسجلّ لكل عميل يحفظ ما قيل وما وُعد به. حتى تتحول المحادثات إلى مبيعات، بدل أن تضيع بين الجوالات.',
      cta: 'تحدّث معنا على واتساب',
      secondary: 'شاهد كيف يعمل',
      note: 'نجهّز حسابك ونساعدك في ربط رقمك · عربي وإنجليزي',
    },
    demo: {
      contact: 'نورة العتيبي',
      initial: 'ن',
      online: 'متصلة الآن',
      today: 'اليوم',
      m1: 'السلام عليكم، عندكم دهن عود كمبودي؟ كم سعر التولة؟',
      m2: 'وعليكم السلام يا نورة، نعم متوفر. سعر التولة 350 ريال، والتوصيل داخل الرياض خلال يوم عمل. أحجز لك؟',
      m3: 'إيه، احجز لي تولتين',
      t1: '11:42 م',
      t2: '11:42 م',
      t3: '11:43 م',
      aiLabel: 'المساعد الذكي',
      typing: 'يكتب…',
      composer: 'اكتب رسالة',
      card: 'بطاقة العميل',
      score: 'التقييم',
      status: 'عميل ساخن',
      signals: 'الإشارات',
      s1: 'طلبت السعر',
      s2: 'جاهزة للشراء',
      owner: 'المسؤول',
      ownerName: 'فهد · المبيعات',
      summary: 'تريد تولتين من دهن العود الكمبودي مع توصيل داخل الرياض.',
      toastTitle: 'أُسندت إليك محادثة',
      toastBody: 'نورة العتيبي · عميل ساخن',
      now: 'الآن',
    },
    trust: {
      lead: 'يعمل عبر منصة واتساب للأعمال الرسمية من Meta',
      items: ['واجهة عربية كاملة', 'على الجوال والكمبيوتر', 'رقم واحد لفريقك كله', 'المحادثات ملك شركتك'],
    },
    chars: {
      hero: 'رجل أعمال سعودي يعرض محادثة واتساب على جواله، وبجانبه سيدة أعمال سعودية',
      ai: 'رجل أعمال سعودي يقرأ رد المساعد الذكي على جواله',
      lead: 'سيدة أعمال سعودية تشير إلى تقييم العميل 86 على جهازها اللوحي',
      campaigns: 'سيدة أعمال سعودية ترسل رسالة واحدة لعملاء كثيرين من جوالها',
      inbox: 'رجل وسيدة أعمال سعوديان يعملان معًا على صندوق الوارد من حاسوب محمول',
      pair: 'رجل أعمال سعودي وسيدة أعمال سعودية يقفان جنبًا إلى جنب',
    },
    sell: {
      kicker: 'مساعد ذكي يرد على عملائك بلهجتهم',
      kickerTag: 'جديد',
      titleHi: 'ولا رسالة',
      titleRest: 'تضيع بعد اليوم.',
      sub: 'نيون يجمع فريقك كله على رقم واتساب واحد، ويرد على عملائك في أي ساعة، ويقولك مين العميل الجاد. عشان كل محادثة تتحول لبيعة.',
      cta: 'ابدأ مع نيون',
      checks: ['رد تلقائي 24 ساعة', 'فريقك كامل على رقم واحد', 'عربي من أول يوم'],
      bentoTitle: 'كل اللي تحتاجه عشان تبيع على واتساب.',
      bentoSub: 'أدوات يستخدمها فريقك كل يوم، مو مجرد رسائل.',
      bento: {
        inbox: { title: 'صندوق وارد واحد لفريقك كله', desc: 'كل محادثة لها مسؤول، والكل يشوف وش صار. ملاحظات داخلية، تحويل، تثبيت وتأجيل.' },
        ai: { title: 'مساعد يرد بقواعدك أنت', desc: 'يعرف منتجاتك وأسعارك، ويحوّل للموظف لما يلزم، ويوقف لحاله إذا رد أحد من فريقك.' },
        lead: { title: 'يقولك مين الجاد', desc: 'كل عميل له تقييم من 100 وإشارات شراء وملخص، والساخن يطلع أول.' },
        camp: { title: 'حملات ما تخاطر برقمك', desc: 'جمهور دقيق، قوالب معتمدة من واتساب، وتقرير لكل رسالة.' },
      },
      stepsTitle: 'تبدأ في 3 خطوات.',
      steps: [
        { title: 'كلّمنا على واتساب', desc: 'قل لنا عن نشاطك وفريقك.' },
        { title: 'نجهّز حسابك ونربط رقمك', desc: 'عبر منصة واتساب الرسمية من Meta، خطوة بخطوة معك.' },
        { title: 'تضيف فريقك وتبدأ', desc: 'كل موظف بحسابه وصلاحياته، من الجوال أو الكمبيوتر.' },
      ],
      localTitle: 'مصمم لطريقة شغلك هنا.',
      localSub: 'من دوام الصبح إلى طلبات آخر الليل، نيون مبني للسوق السعودي والخليجي.',
      morning: { time: '9:00', suffix: 'ص', title: 'الفريق يبدأ من صندوق واحد', desc: 'محادثات الليل موزعة على الفريق، وبجانب كل عميل تقييمه وملخص كلامه.' },
      night: { time: '11:42', suffix: 'م', title: 'المساعد يكمل عنك', desc: 'عميلة تسأل عن السعر. المساعد يرد ويحجز ويقيّمها عميل ساخن، وفهد يلقاها أول القائمة الصبح.' },
      localPoints: ['واجهة عربية كاملة من اليمين لليسار', 'لهجة المساعد: سعودية أو خليجية أو فصحى', 'أرقام سعودية وخليجية بأي صيغة', 'رد تلقائي خارج الدوام'],
      appTitle: 'نيون في جيبك.',
      finalTitle: 'جاهز تشغّل نيون؟',
    },
    wall: {
      title: 'كم رسالة ضاعت أمس؟',
      sub: 'عملاؤك يكتبون في كل وقت، على رقم يحمله شخص واحد. ما لا يُرد عليه خلال دقائق، يذهب لمنافسك.',
      messages: [
        'السلام عليكم، كم السعر؟', 'متوفر مقاس 52؟', 'وش أوقات الدوام يوم الجمعة؟', 'أبغى أحجز موعد بكرة العصر',
        'التوصيل لجدة كم ياخذ؟', 'عندكم خصم للكمية؟', 'وصلني الطلب ناقص', 'ممكن الكتالوج؟', 'تقبلون تابي؟',
        'أرسل لي الموقع لو سمحت', 'هل المنتج أصلي؟', 'متى يرجع اللون الأسود؟', 'ممكن فاتورة ضريبية؟',
        'فيه توصيل للدمام؟', 'الدفع عند الاستلام متاح؟', 'عندكم فرع في الرياض؟', 'طلبي رقم 2847 وين وصل؟',
        'أبغى أكلم أحد من المبيعات', 'كم سعر الجملة؟', 'متى تفتحون بعد التراويح؟',
      ],
      lit: [
        { msg: 'كم سعر التولة؟', tag: 'رد المساعد' },
        { msg: 'أبغى أكلم المدير', tag: 'حُوّلت لموظف' },
        { msg: 'نحتاج 40 علبة للشركة', tag: 'عميل ساخن · 91' },
        { msg: 'أبغى أغيّر العنوان', tag: 'أُسندت إلى سارة' },
      ],
      demoTitle: 'مع نيون، كل رسالة تصل لمن يرد عليها.',
      demoSub: 'الساعة 11:42 مساءً. عميلة تسأل عن السعر، والمساعد يرد بقواعد متجرك، ويقيّمها، ويسلّمها لفهد. كل ذلك قبل أن تفتح جوالك.',
    },
    switch: {
      eyebrow: 'لماذا نيون',
      title: 'واتساب صار واجهة متجرك، لكنه ما زال يُدار من جوال واحد.',
      sub: 'هذا ما يحدث في أغلب الشركات اليوم، وهذا ما يتغير حين تشغّل نيون.',
      before: 'اليوم',
      after: 'مع نيون',
      rows: [
        {
          before: 'الرسائل موزعة على جوالات الموظفين، ولا أحد يرى الصورة كاملة.',
          after: 'رقم واحد وصندوق وارد مشترك. ترى كل محادثة ومن يرد عليها.',
        },
        {
          before: 'عميل كتب الساعة 11 مساءً، وانتظر حتى الصباح.',
          after: 'المساعد الذكي يرد في أي ساعة، ويسلّم المحادثة لموظف حين يلزم.',
        },
        {
          before: 'لا أحد يتذكر ماذا وُعد العميل في آخر محادثة.',
          after: 'ملاحظات داخلية وسجلّ كامل بجانب كل محادثة، والعميل لا يراها.',
        },
        {
          before: 'العملاء الجادّون يضيعون بين مئات الرسائل.',
          after: 'كل عميل يُقيَّم تلقائيًا من 0 إلى 100، والساخن يظهر أولًا.',
        },
        {
          before: 'يغادر الموظف، وتغادر معه محادثاته.',
          after: 'المحادثات ملك شركتك، تنقلها بين الفريق بضغطة.',
        },
      ],
    },
    inbox: {
      eyebrow: 'صندوق الوارد المشترك',
      title: 'فريقك كله على رقم واحد.',
      titleMuted: 'ولا محادثة بلا مسؤول.',
      sub: 'يشبه واتساب الذي يعرفه فريقك، ومعه ما يحتاجه العمل: من يرد، وماذا قيل، وما الخطوة التالية.',
      points: [
        { title: 'توزيع تلقائي', desc: 'كل محادثة جديدة تُسند للموظف الأقل انشغالًا.' },
        { title: 'لا يرد اثنان على عميل واحد', desc: 'يرى زملاؤك أنك تكتب الآن، فلا يتكرر الرد.' },
        { title: 'ملاحظات داخلية', desc: 'تكتب للفريق بجانب المحادثة، والعميل لا يراها.' },
        { title: 'كل ما تعرفه من واتساب', desc: 'صور وملفات ورسائل صوتية، ورد واقتباس وتحويل، وعلامات القراءة.' },
        { title: 'تثبيت وتأجيل', desc: 'ثبّت المهم، وأجّل المحادثة لتعود إليك في وقتها.' },
      ],
      mock: {
        search: 'ابحث أو ابدأ محادثة',
        tabs: ['الكل', 'غير مقروءة', 'محادثاتي'],
        chats: [
          { name: 'نورة العتيبي', msg: 'أهلًا نورة، معك فهد…', time: '11:46 م', tag: 'ساخن', hot: true },
          { name: 'مؤسسة الريان للتجارة', msg: 'نحتاج عرض سعر لـ 40 علبة بخور', time: '10:15 م', unread: 2, tag: 'مؤهل' },
          { name: 'ريم القحطاني', msg: 'متى تفتحون يوم الجمعة؟', time: '9:31 م', bot: true },
          { name: 'خالد الشمري', msg: 'وصلت الطلبية، الله يعطيكم العافية', time: '9:02 م', tag: 'عميل' },
          { name: 'عبدالله الدوسري', msg: 'أبغى أغيّر عنوان التوصيل', time: 'أمس', unread: 1 },
        ],
        assignedTo: 'مسندة إلى فهد',
        autoAssigned: 'أُسندت إلى فهد تلقائيًا',
        botPaused: 'توقف المساعد مؤقتًا لأن فهد رد',
        fahadMsg: 'أهلًا نورة، معك فهد. أكدت طلبك، ويوصلك بكرة قبل الساعة 4 العصر.',
        fahadTime: '11:46 م',
        contactCard: 'العميل',
        phone: '+966 5• ••• 4821',
        score: 'التقييم',
        hot: 'عميل ساخن',
        stage: 'مرحلة الصفقة',
        stageValue: 'مهتمون',
        tags: ['VIP', 'الرياض'],
        note: 'ملاحظة داخلية',
        noteBody: 'تفضّل التواصل بعد العصر. اشترت بخورًا في رمضان.',
        noteBy: 'سارة',
        you: 'أنت',
      },
    },
    ai: {
      eyebrow: 'الذكاء الاصطناعي',
      title: 'مساعد يرد بقواعدك أنت.',
      titleMuted: 'ويعرف متى يسلّم المحادثة لفريقك.',
      sub: 'اكتب له من أنت، وماذا تبيع، وما لا يجوز قوله. يرد بالعربية أو الإنجليزية، وباللهجة التي تختارها: سعودية أو خليجية أو مصرية أو شامية أو فصحى. ويتوقف تلقائيًا حين يرد أحد من فريقك.',
      rules: {
        title: 'إعدادات المساعد',
        on: 'يعمل',
        identity: [
          { k: 'الاسم', v: 'مساعد دار العود' },
          { k: 'اللهجة', v: 'سعودية' },
          { k: 'الأسلوب', v: 'ودود ومختصر' },
        ],
        productsTitle: 'ما نبيعه',
        products: ['دهن عود كمبودي · 350 ر.س للتولة', 'بخور معمول · 120 ر.س'],
        rulesTitle: 'قواعد لا يتجاوزها',
        rules: ['لا خصومات بدون موافقة المدير', 'لا وعود بتوصيل خارج الرياض'],
        handoffTitle: 'يسلّم المحادثة لموظف عند',
        handoff: ['شكوى', 'طلب استرجاع', 'طلب المدير', 'طلب موظف'],
        pause: 'إذا رد أحد من الفريق، يتوقف المساعد 8 ساعات',
      },
      lead: {
        title: 'ويقرأ كل محادثة ليعرف من الجادّ.',
        sub: 'يقيّم نيون كل عميل من 0 إلى 100، ويرصد إشارات الشراء، ويكتب لك ملخصًا وتوصية بالعربية والإنجليزية. فتبدأ يومك بمن يستحق الاتصال أولًا.',
        name: 'نورة العتيبي',
        scoreLabel: 'تقييم العميل',
        status: 'عميل ساخن',
        priority: 'أولوية عالية',
        signalsLabel: 'إشارات الشراء',
        signals: [
          { label: 'طلب السعر', on: true },
          { label: 'جاهز للشراء', on: true },
          { label: 'استعجال', on: true },
          { label: 'طلب موعد', on: false },
          { label: 'طلب اتصال', on: false },
        ],
        summaryLabel: 'الملخص',
        summary: 'تطلب تولتين من دهن العود الكمبودي مع توصيل داخل الرياض، وتريد الاستلام غدًا.',
        recLabel: 'التوصية',
        rec: 'أكّد الطلب وموعد التوصيل اليوم، واقترح عليها البخور المعمول.',
      },
    },
    day: {
      eyebrow: 'يوم عمل مع نيون',
      title: 'من أول الدوام إلى آخر الليل.',
      sub: 'هكذا يبدو يوم شركة تبيع على واتساب، حين يكون كل شيء في مكانه.',
      figureMorning: 'رسم لسيدة أعمال سعودية تعمل على حاسوبها المحمول',
      figureNight: 'رسم لرجل أعمال سعودي بالشماغ والعقال يتابع جواله',
      moments: [
        {
          time: '9:00 ص',
          title: 'الفريق يبدأ من صندوق واحد',
          desc: 'محادثات الليل موزعة على الفريق، وبجانب كل عميل تقييمه وملخص ما قاله.',
        },
        {
          time: '1:30 م',
          title: 'حملة لعملائك المهمين فقط',
          desc: 'عرض نهاية الأسبوع يصل لمن يحمل وسم VIP في الرياض، بقالب معتمد من واتساب.',
        },
        {
          time: '5:00 م',
          title: 'تتابع من جوالك',
          desc: 'إشعار بمحادثة أُسندت إليك. ترد عليها أو تحوّلها لزميل، من أي مكان.',
        },
        {
          time: '11:42 م',
          title: 'المساعد يكمل عنك',
          desc: 'عميلة تسأل عن السعر. المساعد يرد ويحجز ويقيّمها عميلًا ساخنًا، وفهد يجدها في أول القائمة صباحًا.',
        },
        {
          time: 'الجمعة',
          title: 'حملات مجدولة تعمل وحدها',
          desc: 'جدولها مرة واحدة، أو اجعلها تتكرر كل أسبوع.',
        },
      ],
    },
    campaigns: {
      eyebrow: 'الحملات',
      title: 'رسائل جماعية تصل،',
      titleMuted: 'دون أن تخاطر برقمك.',
      sub: 'اختر جمهورك بدقة، وأرسل بقوالب معتمدة من واتساب، وتابع كل رسالة: وصلت، قُرئت، رُدّ عليها، أو لماذا لم تصل.',
      points: [
        { title: 'جمهور بدقة', desc: 'حسب الوسوم والحقول المخصصة، مع عدد المستلمين قبل الإرسال.' },
        { title: 'إرسال يحمي رقمك', desc: 'فحص قبل الإرسال، ووتيرة محسوبة، وحد يومي حسب مستوى رقمك في واتساب.' },
        { title: 'فورية أو مجدولة أو متكررة', desc: 'أرسل الآن، أو حدد الوقت، أو كررها أسبوعيًا.' },
        { title: 'أزرار وقوائم', desc: 'رسائل تفاعلية يرد عليها العميل بلمسة.' },
        { title: 'تقرير لكل حملة', desc: 'من وصلته ومن قرأ ومن رد، وأسباب الفشل ملخصة بلغة واضحة.' },
      ],
      mock: {
        name: 'عرض نهاية الأسبوع',
        status: 'جارٍ الإرسال',
        audience: 'الجمهور',
        chips: ['وسم: VIP', 'المدينة: الرياض'],
        recipients: '1,240 مستلم',
        template: 'القالب',
        approved: 'معتمد من واتساب',
        progress: 'التقدم',
        stats: [
          { label: 'وصلت', value: '1,152', pct: 93 },
          { label: 'قُرئت', value: '864', pct: 70 },
          { label: 'رُدّ عليها', value: '97', pct: 8 },
        ],
        failuresTitle: 'لم تصل · 28',
        failures: [
          { reason: 'الرقم غير مسجّل في واتساب', count: '21' },
          { reason: 'تعذّر التسليم للجهاز', count: '7' },
        ],
        limit: 'حد الإرسال اليوم',
        limitValue: '1,240 من 10,000',
      },
    },
    index: {
      title: 'وكل ما تحتاجه لإدارة عملائك.',
      sub: 'في مكان واحد، بنفس الواجهة، وبالعربية من البداية.',
      groups: [
        {
          title: 'العملاء',
          items: ['جهات اتصال بحقول مخصصة', 'استيراد من Excel وCSV', 'تصدير كامل لبياناتك', 'وسوم وتصنيفات'],
        },
        {
          title: 'المبيعات',
          items: ['مسار صفقات: جدد، مهتمون، تفاوض، مغلقة', 'مهام وتذكيرات للفريق', 'لوحة تعرض من ينتظر الرد', 'تقييم العملاء بالذكاء الاصطناعي'],
        },
        {
          title: 'الرسائل',
          items: ['قوالب واتساب ومتابعة اعتمادها', 'ردود محفوظة', 'رسائل تفاعلية بأزرار وقوائم', 'ردود تلقائية بالكلمات وخارج الدوام'],
        },
        {
          title: 'الفريق',
          items: ['صلاحيات: مدير، قائد فريق، موظف، محلل، مشاهد', 'فرق منفصلة', 'إشعارات فورية', 'وضع ليلي'],
        },
      ],
    },
    mobile: {
      eyebrow: 'التطبيق',
      title: 'نيون في جيبك.',
      sub: 'ثبّته على جوالك أو الكمبيوتر مثل أي تطبيق، بدون متجر تطبيقات. نفس صندوق الوارد ونفس العملاء، مع إشعارات فورية.',
      points: [
        'إشعار بكل رسالة جديدة وكل محادثة تُسند إليك',
        'رسائل صوتية وصور وملفات من الجوال',
        'آيفون وأندرويد والكمبيوتر',
      ],
      install: 'حمّل التطبيق',
      hint: 'آيفون · أندرويد · كمبيوتر',
      installed: 'التطبيق مثبّت',
      phone: {
        title: 'المحادثات',
        chats: [
          { name: 'نورة العتيبي', msg: 'إيه، احجز لي تولتين', time: '11:43', unread: 1 },
          { name: 'مؤسسة الريان', msg: 'نحتاج عرض سعر لـ 40 علبة', time: '10:15', unread: 2 },
          { name: 'ريم القحطاني', msg: 'متى تفتحون يوم الجمعة؟', time: '9:31' },
          { name: 'خالد الشمري', msg: 'وصلت الطلبية', time: '9:02' },
          { name: 'عبدالله الدوسري', msg: 'أبغى أغيّر العنوان', time: 'أمس' },
          { name: 'هيا المطيري', msg: 'تمام، بانتظاركم', time: 'أمس' },
        ],
        push: 'NEON',
        pushBody: 'أُسندت إليك محادثة: نورة العتيبي',
      },
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'قبل أن تبدأ.',
      sub: 'وإن بقي سؤال، اسألنا على واتساب.',
      ask: 'اسألنا على واتساب',
      items: [
        {
          q: 'هل يحتاج كل موظف رقمًا خاصًا؟',
          a: 'لا. فريقك كله يعمل على رقم واتساب واحد لشركتك، وكل موظف يدخل بحسابه وصلاحياته.',
        },
        {
          q: 'كيف يُربط رقم شركتي؟',
          a: 'يعمل نيون عبر منصة واتساب للأعمال الرسمية من Meta. نجهّز حسابك ونساعدك في ربط رقمك خطوة بخطوة.',
        },
        {
          q: 'هل يمكن أن يقول المساعد الذكي شيئًا لا أريده؟',
          a: 'المساعد يعتمد على ما تكتبه له: معلومات شركتك ومنتجاتك وقواعدك. وتحدد المواضيع الممنوعة، ومتى يسلّم المحادثة لموظف، ويتوقف تلقائيًا حين يرد أحد من فريقك.',
        },
        {
          q: 'هل يفهم اللهجات؟',
          a: 'نعم. تختار لغة المساعد ولهجته: سعودية أو خليجية أو مصرية أو شامية أو فصحى. والواجهة كاملة بالعربية والإنجليزية.',
        },
        {
          q: 'هل أستطيع نقل جهات اتصالي الحالية؟',
          a: 'نعم، استوردها من ملف Excel أو CSV. وكل عميل جديد يراسلك تُنشأ له جهة اتصال تلقائيًا.',
        },
        {
          q: 'هل يعمل على الجوال؟',
          a: 'نعم. ثبّته كتطبيق على آيفون أو أندرويد أو الكمبيوتر، وتصلك الإشعارات حتى وهو مغلق.',
        },
        {
          q: 'كم التكلفة؟',
          a: 'تواصل معنا على واتساب، ونوضح لك التفاصيل والأسعار.',
        },
      ],
    },
    final: {
      title: 'شغّل نيون.',
      sub: 'عملاؤك يكتبون لك الآن. اجعل كل رسالة تصل لمن يرد عليها.',
      stepsTitle: 'كيف تبدأ',
      steps: ['تواصل معنا على واتساب', 'نجهّز حسابك ونربط رقمك', 'تدعو فريقك وتبدأ'],
      cta: 'تحدّث معنا على واتساب',
      signIn: 'لديك حساب؟ سجّل الدخول',
    },
    footer: {
      tagline: 'نظام إدارة العملاء المبني على واتساب، لشركات السعودية والخليج.',
      product: 'المنتج',
      account: 'الحساب',
      legal: 'NEON غير تابع لشركة Meta. واتساب علامة تجارية لشركة Meta Platforms, Inc.',
      rights: 'جميع الحقوق محفوظة.',
    },
    install: {
      homeTitle: 'أضف NEON إلى الشاشة الرئيسية',
      desktopTitle: 'ثبّت NEON على هذا الكمبيوتر',
      updating: 'جارٍ التحديث…',
      update: 'يتوفر تحديث، اضغط للتحديث',
    },
  },

  // ═══════════════════════════════════════════ ENGLISH ═══════════════════════
  en: {
    meta: {
      title: 'NEON — The CRM built around WhatsApp',
      description:
        'One WhatsApp number for your whole team, an AI assistant that answers by your rules, automatic scoring of serious buyers, and campaigns that protect your number. The Arabic-first CRM for businesses in Saudi Arabia and the Gulf.',
      ogAlt: 'NEON — Every message is an opportunity',
    },
    nav: {
      links: [
        { id: 'product', label: 'Product' },
        { id: 'ai', label: 'AI' },
        { id: 'campaigns', label: 'Campaigns' },
        { id: 'faq', label: 'FAQ' },
      ],
      signIn: 'Sign in',
      cta: 'Get started',
      menu: 'Open menu',
      close: 'Close menu',
      switchLabel: 'العربية',
      switchHref: '/',
      skip: 'Skip to content',
    },
    cta: {
      start: "Hi, I'd like to get started with NEON",
      question: 'Hi, I have a question about NEON',
    },
    hero: {
      eyebrow: 'The CRM built around WhatsApp',
      title: ['Every message is an opportunity.', 'NEON keeps none of them in the dark.'],
      brandWord: 'NEON',
      sub: 'One WhatsApp number for your whole team, an AI assistant that answers customers by your rules at any hour, and a record of every customer that keeps what was said and promised. So conversations turn into sales, instead of getting lost between phones.',
      cta: 'Talk to us on WhatsApp',
      secondary: 'See how it works',
      note: 'We set up your account and help you connect your number · Arabic & English',
    },
    demo: {
      contact: 'Noura Al-Otaibi',
      initial: 'N',
      online: 'online',
      today: 'Today',
      m1: 'Hi, do you have Cambodian oud oil? How much per tola?',
      m2: 'Hi Noura, yes, it’s in stock. It’s SAR 350 per tola, delivered within one working day in Riyadh. Shall I reserve it for you?',
      m3: 'Yes please, two tolas',
      t1: '11:42 PM',
      t2: '11:42 PM',
      t3: '11:43 PM',
      aiLabel: 'AI assistant',
      typing: 'typing…',
      composer: 'Type a message',
      card: 'Customer card',
      score: 'Score',
      status: 'Hot lead',
      signals: 'Signals',
      s1: 'Asked for price',
      s2: 'Ready to buy',
      owner: 'Owner',
      ownerName: 'Fahad · Sales',
      summary: 'Wants two tolas of Cambodian oud oil, delivered in Riyadh.',
      toastTitle: 'Chat assigned to you',
      toastBody: 'Noura Al-Otaibi · Hot lead',
      now: 'now',
    },
    trust: {
      lead: 'Runs on the official WhatsApp Business Platform from Meta',
      items: ['Fully Arabic interface', 'On phone and desktop', 'One number, whole team', 'Your business owns every chat'],
    },
    chars: {
      hero: 'A Saudi businessman showing a WhatsApp chat on his phone, next to a Saudi businesswoman',
      ai: 'A Saudi businessman reading the AI assistant’s reply on his phone',
      lead: 'A Saudi businesswoman pointing at a lead score of 86 on her tablet',
      campaigns: 'A Saudi businesswoman sending one message to many customers from her phone',
      inbox: 'A Saudi businessman and businesswoman working on the shared inbox from a laptop',
      pair: 'A Saudi businessman and a Saudi businesswoman standing side by side',
    },
    sell: {
      kicker: 'An AI assistant that answers in your customers’ dialect',
      kickerTag: 'New',
      titleHi: 'Never miss',
      titleRest: 'another customer message.',
      sub: 'NEON puts your whole team on one WhatsApp number, answers customers at any hour, and tells you who’s ready to buy. So every conversation can turn into a sale.',
      cta: 'Start with NEON',
      checks: ['Replies 24/7', 'Whole team, one number', 'Arabic from day one'],
      bentoTitle: 'Everything you need to sell on WhatsApp.',
      bentoSub: 'Tools your team uses every day, not just a chat app.',
      bento: {
        inbox: { title: 'One inbox for your whole team', desc: 'Every chat has an owner and everyone sees what happened. Internal notes, transfers, pin and snooze.' },
        ai: { title: 'An assistant that follows your rules', desc: 'It knows your products and prices, hands over to a person when needed, and steps back when your team replies.' },
        lead: { title: 'It tells you who’s serious', desc: 'Every customer gets a score out of 100, buying signals and a summary. Hot leads come first.' },
        camp: { title: 'Campaigns that protect your number', desc: 'Precise audiences, WhatsApp-approved templates, and a report for every message.' },
      },
      stepsTitle: 'Start in 3 steps.',
      steps: [
        { title: 'Message us on WhatsApp', desc: 'Tell us about your business and your team.' },
        { title: 'We set up your account and number', desc: 'Through Meta’s official WhatsApp platform, step by step with you.' },
        { title: 'Add your team and go', desc: 'Everyone gets their own login and permissions, on phone or desktop.' },
      ],
      localTitle: 'Built for how business works here.',
      localSub: 'From the morning shift to late-night orders, NEON is built for Saudi and Gulf businesses.',
      morning: { time: '9:00', suffix: 'AM', title: 'The team starts from one inbox', desc: 'Last night’s chats are already shared out, each with the customer’s score and a summary.' },
      night: { time: '11:42', suffix: 'PM', title: 'The assistant carries on for you', desc: 'A customer asks for a price. The assistant answers, reserves the order and marks her a hot lead, and Fahad finds her first thing in the morning.' },
      localPoints: ['A fully right-to-left Arabic interface', 'Assistant dialect: Saudi, Gulf or formal Arabic', 'Saudi and Gulf numbers in any format', 'Automatic replies outside working hours'],
      appTitle: 'NEON in your pocket.',
      finalTitle: 'Ready to switch on NEON?',
    },
    wall: {
      title: 'How many messages did you miss yesterday?',
      sub: 'Your customers write at every hour, to a number one person carries. Whatever isn’t answered in minutes goes to your competitor.',
      messages: [
        'Hi, how much is it?', 'Do you have size 52?', 'What are your Friday hours?', 'Can I book for tomorrow afternoon?',
        'How long is delivery to Jeddah?', 'Any discount for bulk?', 'My order arrived incomplete', 'Can you send the catalogue?',
        'Do you accept Tabby?', 'Send me the location please', 'Is it original?', 'When is black back in stock?',
        'Can I get a VAT invoice?', 'Do you deliver to Dammam?', 'Is cash on delivery available?', 'Do you have a branch in Riyadh?',
        'Where is order #2847?', 'I’d like to talk to sales', 'What’s the wholesale price?', 'Are you open after Taraweeh?',
      ],
      lit: [
        { msg: 'How much per tola?', tag: 'Assistant replied' },
        { msg: 'I want to speak to the manager', tag: 'Handed to a person' },
        { msg: 'We need 40 boxes for the office', tag: 'Hot lead · 91' },
        { msg: 'I need to change the address', tag: 'Assigned to Sara' },
      ],
      demoTitle: 'With NEON, every message reaches someone who answers.',
      demoSub: '11:42 PM. A customer asks for a price, and the assistant answers by your shop’s rules, scores her, and hands her to Fahad. All before you open your phone.',
    },
    switch: {
      eyebrow: 'Why NEON',
      title: 'WhatsApp became your storefront. It’s still run from one phone.',
      sub: 'This is how most businesses work today, and what changes when you switch on NEON.',
      before: 'Today',
      after: 'With NEON',
      rows: [
        {
          before: 'Messages are scattered across staff phones, and no one sees the whole picture.',
          after: 'One number, one shared inbox. You see every conversation and who is handling it.',
        },
        {
          before: 'A customer wrote at 11 PM and waited until morning.',
          after: 'The AI assistant answers at any hour, and hands over to a person when it should.',
        },
        {
          before: 'No one remembers what the customer was promised last time.',
          after: 'Internal notes and full history beside every chat, never shown to the customer.',
        },
        {
          before: 'Serious buyers get buried under hundreds of messages.',
          after: 'Every customer is scored from 0 to 100 automatically, and hot leads surface first.',
        },
        {
          before: 'An employee leaves, and their conversations leave with them.',
          after: 'Conversations belong to your business. Move them across the team in one tap.',
        },
      ],
    },
    inbox: {
      eyebrow: 'Shared inbox',
      title: 'Your whole team on one number.',
      titleMuted: 'No chat without an owner.',
      sub: 'It feels like the WhatsApp your team already knows, with what a business needs on top: who is replying, what was said, and what happens next.',
      points: [
        { title: 'Automatic assignment', desc: 'Every new conversation goes to the least busy teammate.' },
        { title: 'Never two replies to one customer', desc: 'Teammates see that you are typing, so no one answers twice.' },
        { title: 'Internal notes', desc: 'Write to your team beside the chat. The customer never sees it.' },
        { title: 'Everything you expect from WhatsApp', desc: 'Photos, files and voice notes; reply, quote and forward; read receipts.' },
        { title: 'Pin and snooze', desc: 'Pin what matters, and snooze a chat until it’s time to come back to it.' },
      ],
      mock: {
        search: 'Search or start a chat',
        tabs: ['All', 'Unread', 'Mine'],
        chats: [
          { name: 'Noura Al-Otaibi', msg: 'Hi Noura, this is Fahad…', time: '11:46 PM', tag: 'Hot', hot: true },
          { name: 'Al Rayan Trading', msg: 'We need a quote for 40 boxes of bakhoor', time: '10:15 PM', unread: 2, tag: 'Qualified' },
          { name: 'Reem Al-Qahtani', msg: 'What time do you open on Friday?', time: '9:31 PM', bot: true },
          { name: 'Khalid Al-Shammari', msg: 'The order arrived, thank you!', time: '9:02 PM', tag: 'Customer' },
          { name: 'Abdullah Al-Dosari', msg: 'I need to change the delivery address', time: 'Yesterday', unread: 1 },
        ],
        assignedTo: 'Assigned to Fahad',
        autoAssigned: 'Assigned to Fahad automatically',
        botPaused: 'Assistant paused because Fahad replied',
        fahadMsg: 'Hi Noura, this is Fahad. Your order is confirmed and will reach you tomorrow before 4 PM.',
        fahadTime: '11:46 PM',
        contactCard: 'Customer',
        phone: '+966 5• ••• 4821',
        score: 'Score',
        hot: 'Hot lead',
        stage: 'Deal stage',
        stageValue: 'Interested',
        tags: ['VIP', 'Riyadh'],
        note: 'Internal note',
        noteBody: 'Prefers to be contacted after Asr. Bought bakhoor in Ramadan.',
        noteBy: 'Sara',
        you: 'You',
      },
    },
    ai: {
      eyebrow: 'AI',
      title: 'An assistant that answers by your rules.',
      titleMuted: 'And knows when to hand over to your team.',
      sub: 'Tell it who you are, what you sell, and what it must never say. It answers in Arabic or English, in the dialect you choose: Saudi, Gulf, Egyptian, Levantine or formal Arabic. And it steps back on its own the moment someone from your team replies.',
      rules: {
        title: 'Assistant settings',
        on: 'On',
        identity: [
          { k: 'Name', v: 'Dar Al Oud assistant' },
          { k: 'Dialect', v: 'Saudi' },
          { k: 'Tone', v: 'Friendly, brief' },
        ],
        productsTitle: 'What we sell',
        products: ['Cambodian oud oil · SAR 350 per tola', 'Bakhoor Maamoul · SAR 120'],
        rulesTitle: 'Rules it never breaks',
        rules: ['No discounts without manager approval', 'No delivery promises outside Riyadh'],
        handoffTitle: 'Hands over to a person on',
        handoff: ['Complaint', 'Refund request', 'Asks for manager', 'Asks for a person'],
        pause: 'When a teammate replies, the assistant pauses for 8 hours',
      },
      lead: {
        title: 'And reads every conversation to find who is serious.',
        sub: 'NEON scores every customer from 0 to 100, picks up buying signals, and writes you a summary and a next step in Arabic and English. You start the day with the people worth calling first.',
        name: 'Noura Al-Otaibi',
        scoreLabel: 'Lead score',
        status: 'Hot lead',
        priority: 'High priority',
        signalsLabel: 'Buying signals',
        signals: [
          { label: 'Asked for price', on: true },
          { label: 'Ready to buy', on: true },
          { label: 'Urgent', on: true },
          { label: 'Asked for a meeting', on: false },
          { label: 'Asked for a call', on: false },
        ],
        summaryLabel: 'Summary',
        summary: 'Wants two tolas of Cambodian oud oil delivered in Riyadh, and would like it tomorrow.',
        recLabel: 'Next step',
        rec: 'Confirm the order and delivery time today, and suggest the Bakhoor Maamoul with it.',
      },
    },
    day: {
      eyebrow: 'A day with NEON',
      title: 'From opening time to late at night.',
      sub: 'This is what a day looks like for a business that sells on WhatsApp, once everything is in its place.',
      figureMorning: 'Illustration of a Saudi businesswoman working on her laptop',
      figureNight: 'Illustration of a Saudi businessman in shemagh and agal checking his phone',
      moments: [
        {
          time: '9:00 AM',
          title: 'The team starts from one inbox',
          desc: 'Last night’s conversations are already shared out, each with the customer’s score and a summary of what they said.',
        },
        {
          time: '1:30 PM',
          title: 'A campaign for your best customers only',
          desc: 'The weekend offer goes to everyone tagged VIP in Riyadh, with a template approved by WhatsApp.',
        },
        {
          time: '5:00 PM',
          title: 'You follow along from your phone',
          desc: 'A notification for a chat assigned to you. Reply, or pass it to a teammate, from anywhere.',
        },
        {
          time: '11:42 PM',
          title: 'The assistant carries on for you',
          desc: 'A customer asks for a price. The assistant answers, reserves the order and marks her a hot lead, and Fahad finds her at the top of his list in the morning.',
        },
        {
          time: 'Friday',
          title: 'Scheduled campaigns run on their own',
          desc: 'Schedule it once, or have it repeat every week.',
        },
      ],
    },
    campaigns: {
      eyebrow: 'Campaigns',
      title: 'Broadcasts that land,',
      titleMuted: 'without putting your number at risk.',
      sub: 'Pick exactly who should hear from you, send with templates approved by WhatsApp, and follow every message: delivered, read, replied to, or why it didn’t arrive.',
      points: [
        { title: 'Precise audiences', desc: 'By tags and custom fields, with the recipient count before you send.' },
        { title: 'Sending that protects your number', desc: 'A check before sending, measured pacing, and a daily limit that follows your WhatsApp tier.' },
        { title: 'Now, scheduled or recurring', desc: 'Send now, pick a time, or repeat it every week.' },
        { title: 'Buttons and lists', desc: 'Interactive messages customers answer with one tap.' },
        { title: 'A report for every campaign', desc: 'Who received it, read it and replied, with failure reasons summarised in plain language.' },
      ],
      mock: {
        name: 'Weekend offer',
        status: 'Sending',
        audience: 'Audience',
        chips: ['Tag: VIP', 'City: Riyadh'],
        recipients: '1,240 recipients',
        template: 'Template',
        approved: 'Approved by WhatsApp',
        progress: 'Progress',
        stats: [
          { label: 'Delivered', value: '1,152', pct: 93 },
          { label: 'Read', value: '864', pct: 70 },
          { label: 'Replied', value: '97', pct: 8 },
        ],
        failuresTitle: 'Not delivered · 28',
        failures: [
          { reason: 'Number isn’t on WhatsApp', count: '21' },
          { reason: 'Couldn’t reach the device', count: '7' },
        ],
        limit: 'Today’s sending limit',
        limitValue: '1,240 of 10,000',
      },
    },
    index: {
      title: 'And everything else you need to run your customers.',
      sub: 'In one place, in one interface, and in Arabic from day one.',
      groups: [
        {
          title: 'Customers',
          items: ['Contacts with custom fields', 'Import from Excel and CSV', 'Full export of your data', 'Tags and segments'],
        },
        {
          title: 'Sales',
          items: ['Deal pipeline: new, interested, negotiation, closed', 'Tasks and reminders for the team', 'A home screen that shows who is waiting', 'AI lead scoring'],
        },
        {
          title: 'Messaging',
          items: ['WhatsApp templates with approval tracking', 'Saved replies', 'Interactive messages with buttons and lists', 'Auto-replies by keyword and outside hours'],
        },
        {
          title: 'Team',
          items: ['Roles: admin, team lead, agent, analyst, viewer', 'Separate teams', 'Instant notifications', 'Dark mode'],
        },
      ],
    },
    mobile: {
      eyebrow: 'The app',
      title: 'NEON in your pocket.',
      sub: 'Install it on your phone or computer like any app, no app store needed. The same inbox and the same customers, with instant notifications.',
      points: [
        'A notification for every new message and every chat assigned to you',
        'Voice notes, photos and files from your phone',
        'iPhone, Android and desktop',
      ],
      install: 'Download the app',
      hint: 'iPhone · Android · Desktop',
      installed: 'App installed',
      phone: {
        title: 'Chats',
        chats: [
          { name: 'Noura Al-Otaibi', msg: 'Yes please, two tolas', time: '11:43', unread: 1 },
          { name: 'Al Rayan Trading', msg: 'We need a quote for 40 boxes', time: '10:15', unread: 2 },
          { name: 'Reem Al-Qahtani', msg: 'What time do you open Friday?', time: '9:31' },
          { name: 'Khalid Al-Shammari', msg: 'The order arrived', time: '9:02' },
          { name: 'Abdullah Al-Dosari', msg: 'I need to change the address', time: 'Yest.' },
          { name: 'Haya Al-Mutairi', msg: 'Great, see you then', time: 'Yest.' },
        ],
        push: 'NEON',
        pushBody: 'Chat assigned to you: Noura Al-Otaibi',
      },
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Before you start.',
      sub: 'Still have a question? Ask us on WhatsApp.',
      ask: 'Ask us on WhatsApp',
      items: [
        {
          q: 'Does every employee need their own number?',
          a: 'No. Your whole team works on your business’s one WhatsApp number, and everyone signs in with their own account and permissions.',
        },
        {
          q: 'How is my business number connected?',
          a: 'NEON runs on the official WhatsApp Business Platform from Meta. We set up your account and help you connect your number step by step.',
        },
        {
          q: 'Could the AI assistant say something I don’t want?',
          a: 'The assistant works from what you give it: your company details, products and rules. You set forbidden topics and when it hands a chat to a person, and it pauses on its own whenever someone from your team replies.',
        },
        {
          q: 'Does it understand dialects?',
          a: 'Yes. You choose the assistant’s language and dialect: Saudi, Gulf, Egyptian, Levantine or formal Arabic. The whole interface works in Arabic and English.',
        },
        {
          q: 'Can I bring my existing contacts?',
          a: 'Yes, import them from Excel or CSV. And every new customer who messages you gets a contact created automatically.',
        },
        {
          q: 'Does it work on mobile?',
          a: 'Yes. Install it as an app on iPhone, Android or desktop, and get notifications even when it’s closed.',
        },
        {
          q: 'How much does it cost?',
          a: 'Message us on WhatsApp and we’ll walk you through the details and pricing.',
        },
      ],
    },
    final: {
      title: 'Switch on NEON.',
      sub: 'Your customers are writing to you right now. Make sure every message reaches someone who answers.',
      stepsTitle: 'How to start',
      steps: ['Message us on WhatsApp', 'We set up your account and connect your number', 'Invite your team and go'],
      cta: 'Talk to us on WhatsApp',
      signIn: 'Already have an account? Sign in',
    },
    footer: {
      tagline: 'The CRM built around WhatsApp, for businesses in Saudi Arabia and the Gulf.',
      product: 'Product',
      account: 'Account',
      legal: 'NEON is not affiliated with Meta. WhatsApp is a trademark of Meta Platforms, Inc.',
      rights: 'All rights reserved.',
    },
    install: {
      homeTitle: 'Add NEON to your Home Screen',
      desktopTitle: 'Install NEON on this computer',
      updating: 'Updating…',
      update: 'Update available — tap to update',
    },
  },
}
