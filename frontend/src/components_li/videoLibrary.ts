type MoodType = "HAPPY" | "EXCITED" | "RELAXED" | "NEUTRAL" | "CONFUSED" | "BORED" | "SAD" | "ANGRY";

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export const videoLibrary: Record<MoodType, Video[]> = {
  HAPPY: [
              { id: 'happy2', title: 'How to Stay Happy Everyday', url: 'https://www.youtube.com/watch?v=6dluwVks444', thumbnail: 'https://i.ytimg.com/vi/6dluwVks444/hqdefault.jpg' },
              {
                id: 'happy3',
                title: 'How to Be Happy Every Day: It Will Change the World',
                url: 'https://www.youtube.com/watch?v=78nsxRxbf4w',
                thumbnail: 'https://i.ytimg.com/vi/78nsxRxbf4w/hqdefault.jpg'
              },
              
              { id: 'happy4', title: 'Positive Psychology: The Science of Happiness', url: 'https://www.youtube.com/watch?v=8KkKuTCFvzI', thumbnail: 'https://i.ytimg.com/vi/8KkKuTCFvzI/hqdefault.jpg' },
              { id: 'happy5', title: 'Yale Course: The Science of Well-Being', url: 'https://www.youtube.com/watch?v=ZizdB0TgAVM', thumbnail: 'https://i.ytimg.com/vi/ZizdB0TgAVM/hqdefault.jpg' },
              {
                id: 'happy6',
                title: 'How to Be Happy: 7 Habits of Happy People',
                url: 'https://www.youtube.com/watch?v=ecZ7KvLATAc',
                thumbnail: 'https://i.ytimg.com/vi/ecZ7KvLATAc/hqdefault.jpg'
              }
              ,
        {
                id: 'happy7',
                title: 'The Habits of Happy People',
                url: 'https://www.youtube.com/watch?v=TpZC6np458o',
                thumbnail: 'https://i.ytimg.com/vi/TpZC6np458o/hqdefault.jpg'
              }
              ,
              { id: 'happy8', title: 'The Happy Secret to Better Work', url: 'https://www.youtube.com/watch?v=fLJsdqxnZb0', thumbnail: 'https://i.ytimg.com/vi/fLJsdqxnZb0/hqdefault.jpg' },
              { id: 'happy9', title: 'How Happiness Leads to Success', url: 'https://www.youtube.com/watch?v=GXy__kBVq1M', thumbnail: 'https://i.ytimg.com/vi/GXy__kBVq1M/hqdefault.jpg' },
              { id: 'happy10', title: 'The Surprising Science of Happiness', url: 'https://www.youtube.com/watch?v=4q1dgn_C0AU', thumbnail: 'https://i.ytimg.com/vi/4q1dgn_C0AU/hqdefault.jpg' },
              {
                "id": "happy11",
                "title": "Songs that'll make you dance the whole day ~ Mood booster playlist",
                "url": "https://www.youtube.com/watch?v=ljnGl5nvUJY",
                "thumbnail": "https://i.ytimg.com/vi/ljnGl5nvUJY/hqdefault.jpg"
              },
             
              {
                "id": "happy12",
                "title": "The Art of Being Happy",
                "url": "https://www.youtube.com/watch?v=OUO71R6jMig",
                "thumbnail": "https://i.ytimg.com/vi/OUO71R6jMig/hqdefault.jpg"
              },
              {
                "id": "happy13",
                "title": "Happiness is a Choice",
                "url": "https://www.youtube.com/watch?v=NrR-C5EUTE0",
                "thumbnail": "https://i.ytimg.com/vi/NrR-C5EUTE0/hqdefault.jpg"
              },
              
              {
                "id": "happy14",
                "title": "The Art of Being Happy",
                "url": "https://www.youtube.com/watch?v=JD2LNSL_gj4",
                "thumbnail": "https://i.ytimg.com/vi/JD2LNSL_gj4/hqdefault.jpg"
              },
              {
                "id": "happy15",
                "title": "5 Minute Meditation for Positive Thinking",
                "url": "https://www.youtube.com/watch?v=QfREanf59Sk",
                "thumbnail": "https://i.ytimg.com/vi/QfREanf59Sk/hqdefault.jpg"
              },
              
              {
                "id": "happy16",
                "title": "The Happiness Advantage",
                "url": "https://www.youtube.com/watch?v=GXy__kBVq1M",
                "thumbnail": "https://i.ytimg.com/vi/GXy__kBVq1M/hqdefault.jpg"
              },
              {
                "id": "happy17",
                "title": "Happy Dance Song",
                "url": "https://www.youtube.com/watch?v=Hb4erW8blkM",
                "thumbnail": "https://i.ytimg.com/vi/Hb4erW8blkM/hqdefault.jpg"
              },
              {
                "id": "happy18",
                "title": "Finding Joy in Simple Things",
                "url": "https://www.youtube.com/watch?v=UnLnUI_hy1Y",
                "thumbnail": "https://i.ytimg.com/vi/UnLnUI_hy1Y/hqdefault.jpg"
              },
              {
                "id": "happy19",
                "title": "Happiness Frequency - Serotonin, Dopamine and Endorphin Release Music",
                "url": "https://www.youtube.com/watch?v=8M143iRrbgw",
                "thumbnail": "https://i.ytimg.com/vi/8M143iRrbgw/hqdefault.jpg"
              },
              {
                "id": "happy20",
                "title": "Gratitude Practices for Happiness",
                "url": "https://www.youtube.com/watch?v=WPPPFqsECz0",
                "thumbnail": "https://i.ytimg.com/vi/WPPPFqsECz0/hqdefault.jpg"
              },
              {
                "id": "happy21",
                "title": "You Don't Find Happiness, You Create It",
                "url": "https://www.youtube.com/watch?v=9DtcSCFwDdw",
                "thumbnail": "https://i.ytimg.com/vi/9DtcSCFwDdw/hqdefault.jpg"
              },
              {
                "id": "happy22",
                "title": "The Four Pillars of a Happy Life",
                "url": "https://www.youtube.com/watch?v=l2wgIckqehg",
                "thumbnail": "https://i.ytimg.com/vi/l2wgIckqehg/hqdefault.jpg"
              },
              {
                "id": "happy23",
                "title": "Happiness Habits: Small Changes, Big Results",
                "url": "https://www.youtube.com/watch?v=75d_29QWELk",
                "thumbnail": "https://i.ytimg.com/vi/75d_29QWELk/hqdefault.jpg"
              },
              
              {
                "id": "happy24",
                "title": "The Psychology of Happiness",
                "url": "https://www.youtube.com/watch?v=UHyi4yJ6VAo",
                "thumbnail": "https://i.ytimg.com/vi/UHyi4yJ6VAo/hqdefault.jpg"
              },
              {
                "id": "happy25",
                "title": "The Secret to Being Happy",
                "url": "https://www.youtube.com/watch?v=Udap-5rVWeM",
                "thumbnail": "https://i.ytimg.com/vi/Udap-5rVWeM/hqdefault.jpg"
              },
              {
                "id": "happy26",
                "title": "Finding Your Happy Place",
                "url": "https://www.youtube.com/watch?v=zRSQw-LjU8k",
                "thumbnail": "https://i.ytimg.com/vi/zRSQw-LjU8k/hqdefault.jpg"
              },
              {
                "id": "happy27",
                "title": "Happy Yoga Flow",
                "url": "https://www.youtube.com/watch?v=doLpeoHKfOQ",
                "thumbnail": "https://i.ytimg.com/vi/doLpeoHKfOQ/hqdefault.jpg"
              },
              {
                "id": "happy28",
                "title": "Become Happier - The Science of Well-being",
                "url": "https://www.youtube.com/watch?v=cJPBB9m8WKw",
                "thumbnail": "https://i.ytimg.com/vi/cJPBB9m8WKw/hqdefault.jpg"
              },
              {
                "id": "happy29",
                "title": "Happy Mind, Happy Life",
                "url": "https://www.youtube.com/watch?v=TFbv757kup4",
                "thumbnail": "https://i.ytimg.com/vi/TFbv757kup4/hqdefault.jpg"
              },
              {
                "id": "happy30",
                "title": "Signs You Are Actually Happy",
                "url": "https://www.youtube.com/watch?v=Ml-n59ExA9k",
                "thumbnail": "https://i.ytimg.com/vi/Ml-n59ExA9k/hqdefault.jpg"
              },
              
                {
                  "id": "happy31",
                  "title": "Happy Life Documentary",
                  "url": "https://www.youtube.com/watch?v=NO_GdfSe9To",
                  "thumbnail": "https://i.ytimg.com/vi/NO_GdfSe9To/hqdefault.jpg"
                },
                {
                  "id": "happy32",
                  "title": "10 Happy Habits to Transform Your Life",
                  "url": "https://youtu.be/G7dgGxJPd-c?si=tYBWifgkz-ZUlR6f",
                  "thumbnail": "https://i.ytimg.com/vi/G7dgGxJPd-c/hqdefault.jpg"
                },
                {
                  "id": "happy33",
                  "title": "M-cuQ_9K4Cc",
                  "url": "https://youtu.be/M-cuQ_9K4Cc?si=cWogOh-3ai5fB88S",
                  "thumbnail": "https://i.ytimg.com/vi/M-cuQ_9K4Cc/hqdefault.jpg"
                },
               
              
                {
                  "id": "happy34",
                  "title": "Happy Kids: Raising Joyful Children",
                  "url": "https://youtu.be/y6G9WbLOyZc?si=GLp16DeFyaDuBPsd",
                  "thumbnail": "https://i.ytimg.com/vi/y6G9WbLOyZc/hqdefault.jpg"
                },
                
                  {
                    "id": "happy35",
                    "title": "The Neuroscience of Happiness",
                    "url": "https://youtu.be/EXCDrjDfX04?si=8hx9ol4-8kjIM1TZ",
                    "thumbnail": "https://i.ytimg.com/vi/EXCDrjDfX04/hqdefault.jpg"
                  },
                  {
                    "id": "happy36",
                    "title": "Random Acts of Kindness - Spreading Happiness",
                    "url": "https://youtu.be/IPK_Lcb12Og?si=tPOb311EaXBhULrB",
                    "thumbnail": "https://i.ytimg.com/vi/IPK_Lcb12Og/hqdefault.jpg"
                  },
            
                {
                  "id": "happy37",
                  "title": "The Psychology and Neuroscience of Happiness",
                  "url": "https://youtu.be/6Gpxjeq2CJ8?si=1BetjMFg82JbZEtx",
                  "thumbnail": "https://i.ytimg.com/vi/6Gpxjeq2CJ8/hqdefault.jpg"
                },
               
               
                {
                  "id": "happy38",
                  "title": "The Connection Between Purpose and Happiness",
                  "url": "https://youtu.be/UGy1_CYLLi4?si=K8t8aBuUi3ZQS8tw",
                  "thumbnail": "https://i.ytimg.com/vi/UGy1_CYLLi4/hqdefault.jpg"
                },
                {
                  "id": "happy39",
                  "title": "Happy Music for Work and Study",
                  "url": "https://youtu.be/ubnDMTUui1Y?si=QSAOQioTZGtIKO2c",
                  "thumbnail": "https://i.ytimg.com/vi/ubnDMTUui1Y/hqdefault.jpg"
                },
                {
                  "id": "happy40",
                  "title": "The Link Between Gratitude and Happiness",
                  "url": "https://youtu.be/mMkzh43e3Sw?si=rouXJ5ubSCXrHjWx",
                  "thumbnail": "https://i.ytimg.com/vi/WPPPFqsECz0/hqdefault.jpg"
                },
                
                {
                  "id": "happy41",
                  "title": "10 Habits Of Happy People - How to Be Happy",
                  "url": "https://youtu.be/XLBKy7g3yTc?si=nn264qz9IGaLZOSV",
                  "thumbnail": "https://i.ytimg.com/vi/XLBKy7g3yTc/hqdefault.jpg"
                },
                {
                  "id": "happy42",
                  "title": "How to Increase Your Happiness",
                  "url": "https://youtu.be/m4Ics03xzUQ?si=RSTxRchpXCd3Spzy",
                  "thumbnail": "https://i.ytimg.com/vi/m4Ics03xzUQ/hqdefault.jpg"
                },
                {
                  "id": "happy44",
                  "title": "6 Habits That Will Make Your Life Happier",
                  "url": "https://youtu.be/W7_lafxj8ok?si=vpnoM5hScmFlnBos",
                  "thumbnail": "https://i.ytimg.com/vi/W7_lafxj8ok/hqdefault.jpg"
                }
              ,
                  {
                    "id": "happy45",
                    "title": "The Secret to Happiness",
                    "url": "https://youtube.com/shorts/lF8jZdvZeA0?si=K10saoQ0iVfGv5h6",
                    "thumbnail": "https://i.ytimg.com/vi/lF8jZdvZeA0/hqdefault.jpg"
                  },
                  {
                    "id": "happy46",
                    "title": "The Happiness Equation",
                    "url": "https://youtu.be/VAjfHDw8wOA?si=cUGQ1ewmR6hGCQkv",
                    "thumbnail": "https://i.ytimg.com/vi/VAjfHDw8wOA/hqdefault.jpg"
                  },
                  {
                    "id": "happy47",
                    "title": "Happy Living: Minimalism and Joy",
                    "url": "https://youtu.be/zkTX1eNhixY?si=Q7nJsUXw_F9OA7gg",
                    "thumbnail": "https://i.ytimg.com/vi/zkTX1eNhixY/hqdefault.jpg"
                  },
                  {
                    "id": "happy48",
                    "title": "The Algebra Of Happiness | The Secret Mathematics Formula To Happiness",
                    "url": "https://youtu.be/ftvNs08fUJA?si=IsKDxgSyR8ReybsF",
                    "thumbnail": "https://i.ytimg.com/vi/ftvNs08fUJA/hqdefault.jpg"
                  },
                  {
                    "id": "happy49",
                    "title": "The Power of Laughter: How It Affects Your Brain",
                    "url": "https://youtu.be/TT_-8UDpHig?si=EomiDlxO0eOoFmuW",
                    "thumbnail": "https://i.ytimg.com/vi/TT_-8UDpHig/hqdefault.jpg"
                  },
                  {
                    "id": "happy50",
                    "title": "The Science Behind Smiling and Happiness",
                    "url": "https://youtu.be/DHEIAPNFsOA?si=15a8fA21KLgJJs6c",
                    "thumbnail": "https://i.ytimg.com/vi/DHEIAPNFsOA/hqdefault.jpg"
                  }
      ],
      
      EXCITED:[
  
    { id: 'excited1', title: 'Best Motivational Speech Ever', url: 'https://www.youtube.com/watch?v=mgmVOuLgFB0', thumbnail: 'https://i.ytimg.com/vi/mgmVOuLgFB0/hqdefault.jpg' },
    { id: 'excited2', title: 'How to Achieve Your Dreams', url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0', thumbnail: 'https://i.ytimg.com/vi/ZXsQAXx_ao0/hqdefault.jpg' },
    { id: 'excited3', title: 'The Power of Believing in Yourself', url: 'https://www.youtube.com/watch?v=wzhzkKccBi8', thumbnail: 'https://i.ytimg.com/vi/wzhzkKccBi8/hqdefault.jpg' },
      { id: 'excited1', title: 'How to Channel Excitement Productively', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },

      {
        "id": "excited37",
        "title": "The Science of Excitement and Anticipation",
        "url": "https://youtu.be/B7OHbJ6QxqM?si=CP3TQL2ThTMS_lbW",
        "thumbnail": "https://i.ytimg.com/vi/B7OHbJ6QxqM/hqdefault.jpg"
      },
      {
        "id": "excited38",
        "title": "Energizing Music for Excitement",
        "url": "https://youtu.be/hF7BkvLJwqg?si=s2YHNk24q4zlRaD2",
        "thumbnail": "https://i.ytimg.com/vi/hF7BkvLJwqg/hqdefault.jpg"
      },
      
      { id: 'excited4', title: 'Excitement vs. Anxiety: Understanding the Difference', url: 'https://www.youtube.com/watch?v=f3dDVtJ2sec', thumbnail: 'https://i.ytimg.com/vi/f3dDVtJ2sec/hqdefault.jpg' },
      


      { 
        "id": "excited5", 
        "title": "When I am Feeling Excited", 
        "url": "https://www.youtube.com/watch?v=q2-TYH2dJR8", 
        "thumbnail": "https://i.ytimg.com/vi/q2-TYH2dJR8/hqdefault.jpg" 
      },
      { 
        "id": "excited6", 
        "title": "7 Exciting Trends in Neuroscience: Exploring the Future of Brain Research", 
        "url": "https://www.youtube.com/watch?v=MwqYuk_BHrk", 
        "thumbnail": "https://i.ytimg.com/vi/MwqYuk_BHrk/hqdefault.jpg" 
      },
      
      { 
        "id": "excited7", 
        "title": "Should You Control Your Excitement?", 
        "url": "https://www.youtube.com/watch?v=TthOLlfkfLk", 
        "thumbnail": "https://i.ytimg.com/vi/TthOLlfkfLk/hqdefault.jpg" 
      },

      { 
        "id": "excited8", 
        "title": "Excitement Meditation: Harnessing Positive Energy", 
        "url": "https://www.youtube.com/watch?v=6OlH4vBLm_Y", 
        "thumbnail": "https://i.ytimg.com/vi/6OlH4vBLm_Y/hqdefault.jpg" 
      },
      
      { 
        "id": "excited9", 
        "title": "Boost Your Energy - 10 Minutes for a Full Energy Charge", 
        "url": "https://www.youtube.com/watch?v=tmqHGtI2Twg", 
        "thumbnail": "https://i.ytimg.com/vi/tmqHGtI2Twg/hqdefault.jpg" 
      },

     

      { 
        "id": "excited10", 
        "title": "Excitement Workout: Exercise for Energy", 
        "url": "https://www.youtube.com/watch?v=PGNWnRxEyoE", 
        "thumbnail": "https://i.ytimg.com/vi/PGNWnRxEyoE/hqdefault.jpg" 
      },

      { 
        "id": "excited11", 
        "title": "Cultivating Excitement in Daily Life", 
        "url": "https://www.youtube.com/shorts/BLdNby-mQkM", 
        "thumbnail": "https://i.ytimg.com/vi/BLdNby-mQkM/hqdefault.jpg" 
      },
      
      { 
        "id": "excited12", 
        "title": "Excitement and Creativity: Boosting Innovation", 
        "url": "https://www.youtube.com/watch?v=KPlJcD-o-4Q", 
        "thumbnail": "https://i.ytimg.com/vi/KPlJcD-o-4Q/hqdefault.jpg" 
      },
      
      { 
        "id": "excited13", 
        "title": "Excitement and Flow State: Achieving Peak Performance", 
        "url": "https://www.youtube.com/watch?v=znwUCNrjpD4", 
        "thumbnail": "https://i.ytimg.com/vi/znwUCNrjpD4/hqdefault.jpg" 
      },
      
      { 
        "id": "excited14", 
        "title": "The Psychology of Excitement", 
        "url": "https://www.youtube.com/shorts/tVY1zU9Knos", 
        "thumbnail": "https://i.ytimg.com/vi/tVY1zU9Knos/hqdefault.jpg" 
      },
      
      { 
        "id": "excited15", 
        "title": "Excitement and Dopamine: Brain Chemistry", 
        "url": "https://www.youtube.com/watch?v=ldPuBk7a9V4", 
        "thumbnail": "https://i.ytimg.com/vi/ldPuBk7a9V4/hqdefault.jpg" 
      },
      
      { 
        "id": "excited16", 
        "title": "Exciting Morning Routines for Energy", 
        "url": "https://www.youtube.com/watch?v=gR_f-iwUGY4", 
        "thumbnail": "https://i.ytimg.com/vi/gR_f-iwUGY4/hqdefault.jpg" 
      },
      
      { 
        "id": "excited17", 
        "title": "Excitement and Risk-Taking: Finding Balance", 
        "url": "https://www.youtube.com/watch?v=fhHVa-9h4Gs", 
        "thumbnail": "https://i.ytimg.com/vi/fhHVa-9h4Gs/hqdefault.jpg" 
      },
      
      { 
        "id": "excited18", 
        "title": "Excitement Contagion: Spreading Positive Energy", 
        "url": "https://www.youtube.com/watch?v=Rilj2tcGJHU", 
        "thumbnail": "https://i.ytimg.com/vi/Rilj2tcGJHU/hqdefault.jpg" 
      },
      
      { 
        "id": "excited19", 
        "title": "Channeling Excitement for Personal Growth", 
        "url": "https://www.youtube.com/watch?v=fjFHQ0k5-zQ", 
        "thumbnail": "https://i.ytimg.com/vi/fjFHQ0k5-zQ/hqdefault.jpg" 
      },
      
      { 
        "id": "excited20", 
        "title": "Excitement and Engagement: Keys to Success", 
        "url": "https://www.youtube.com/live/GA2yNHgiJ4c", 
        "thumbnail": "https://i.ytimg.com/vi/GA2yNHgiJ4c/hqdefault.jpg" 
      },
      
      { 
        "id": "excited21", 
        "title": "Excitement Soundtrack: Music to Boost Energy", 
        "url": "https://www.youtube.com/live/Y89vsiKpUtY", 
        "thumbnail": "https://i.ytimg.com/vi/Y89vsiKpUtY/hqdefault.jpg" 
      },
     
     

      {
        "id": "excited22",
        "title": "Turning Excitement into Action",
        "url": "https://youtube.com/shorts/mYE58rkUfz4?si=g4U7sMgZpKmAhIUu",
        "thumbnail": "https://i.ytimg.com/vi/mYE58rkUfz4/hqdefault.jpg"

      },



      {
        "id": "excited23",
        "title": "The Excitement of Learning New Skills",
        "url": "https://youtube.com/shorts/JWDgTyGhHxU?si=ARU44UlUWXuVDkTm",
        "thumbnail": "https://i.ytimg.com/vi/JWDgTyGhHxU/hqdefault.jpg"
      },


      {
        "id": "excited24",
        "title": "Excitement and Confidence Building",
        "url": "https://youtu.be/l_NYrWqUR40?si=1wsSWVucXklvEg9D",
        "thumbnail": "https://i.ytimg.com/vi/l_NYrWqUR40/hqdefault.jpg"
      },
      {
        "id": "excited25",
        "title": "Natural Ways to Boost Excitement",
        "url": "https://youtu.be/esB7YblpnRo?si=6MdWIL2XeDr-mwTY",
        "thumbnail": "https://i.ytimg.com/vi/esB7YblpnRo/hqdefault.jpg"
      },
      {
        "id": "excited26",
        "title": "Excitement and Attention: Focusing Your Energy",
        "url": "https://youtu.be/Om435J7u1T8?si=IRU6eUgt0aydm36V",
        "thumbnail": "https://i.ytimg.com/vi/Om435J7u1T8/hqdefault.jpg"
      },
      {
        "id": "excited27",
        "title": "Excitement for Better Performance",
        "url": "https://youtube.com/shorts/RmA_HUknMoQ?si=933kJ80zwJztZkzF",
        "thumbnail": "https://i.ytimg.com/vi/RmA_HUknMoQ/hqdefault.jpg"
      },
      {
        "id": "excited28",
        "title": "Excitement-Driven How To Stay Motivated - The Locus Rule",
        "url": "https://youtu.be/8ZhoeSaPF-k?si=B5l3g6B92kL7FEKr",
        "thumbnail": "https://i.ytimg.com/vi/8ZhoeSaPF-k/hqdefault.jpg"
      },
      {
        "id": "excited29",
        "title": "Excitement and Resilience: Maintaining Enthusiasm",
        "url": "https://youtube.com/shorts/ghsC6azFQfA?si=nwZbB0WQG2b91oX6",
        "thumbnail": "https://i.ytimg.com/vi/ghsC6azFQfA/hqdefault.jpg"
      },
      {
        "id": "excited30",
        "title": "Excitement Journaling: Capturing Peak Moments",
        "url": "https://youtu.be/7ZiWsN8XSCE?si=zS1DwIm7_mvdkqs2",
        "thumbnail": "https://i.ytimg.com/vi/7ZiWsN8XSCE/hqdefault.jpg"
      },
      {
        "id": "excited31",
        "title": "Excitement and Well-being: Health Benefits",
        "url": "https://youtube.com/shorts/VKb3zivtykE?si=9Nj5AlTY04_EquP5",
        "thumbnail": "https://i.ytimg.com/vi/VKb3zivtykE/hqdefault.jpg"
      },
      {
        "id": "excited32",
        "title": "The Art of Generating Excitement",
        "url": "https://youtube.com/shorts/pjbooLCllNU?si=-1gpK0DDFtmWcFTd",
        "thumbnail": "https://i.ytimg.com/vi/pjbooLCllNU/hqdefault.jpg"
      },
      {
        "id": "excited33",
        "title": "Excitement in Relationships: Keeping the Spark",
        "url": "https://youtu.be/aKk4Gu9teqU?si=6DwqSfqv94cnXh7k",
        "thumbnail": "https://i.ytimg.com/vi/aKk4Gu9teqU/hqdefault.jpg"
      },
      {
        "id": "excited34",
        "title": "Excitement and Productivity: Getting Things Done",
        "url": "https://youtu.be/gCswMsONkwY?si=Tbr8Vr5mjsUEm5z4",
        "thumbnail": "https://i.ytimg.com/vi/gCswMsONkwY/hqdefault.jpg"
      },
      {
        "id": "excited35",
        "title": "Measuring Excitement: Biofeedback Techniques",
        "url": "https://youtu.be/Va3yQeZWXzk?si=lUoFppxdXY2X4cdW",
        "thumbnail": "https://i.ytimg.com/vi/Va3yQeZWXzk/hqdefault.jpg"
      },
      {
        "id": "excited36",
        "title": "Excitement and Exploration: Discovering New Passions",
        "url": "https://youtu.be/6pgaJb2Wwhs?si=Q7HXeVuubUUlfSuv",
        "thumbnail": "https://i.ytimg.com/vi/6pgaJb2Wwhs/hqdefault.jpg"
      },
      {
        "id": "excited37",
        "title": "Managing Excitement: Balancing Emotions",
        "url": "https://youtu.be/Uew5BbvmLks?si=WOqAJZWfyxJ9eZIZ",
        "thumbnail": "https://i.ytimg.com/vi/Uew5BbvmLks/hqdefault.jpg"
      },
      {
        "id": "excited38",
        "title": "Excitement and Visualization: Achieving Goals",
        "url": "https://youtu.be/NoqEPY2fQyY?si=NUxHlkOvCcC20EHq",
        "thumbnail": "https://i.ytimg.com/vi/NoqEPY2fQyY/hqdefault.jpg"
      },
    
      {
        "id": "excited39",
        "title": "Excitement and Mindfulness: Being Present",
        "url": "https://youtu.be/caAURGZBLeY?si=72pAQWbf36FN3nk4",
        "thumbnail": "https://i.ytimg.com/vi/caAURGZBLeY/hqdefault.jpg"
      }
,      
{
  "id": "excited40",
  "title": "Excitement-Driven Habits for Success",
  "url": "https://youtube.com/shorts/IjU12rYsgMk?si=wzcKVXS7_Qnyt_Md",
  "thumbnail": "https://i.ytimg.com/vi/IjU12rYsgMk/hqdefault.jpg"
},


{
  "id": "excited41",
  "title": "Excitement Techniques for Public Speaking",
  "url": "https://youtu.be/83wYDzO3CzI?si=5HlHwhx0B_wkvIbY",
  "thumbnail": "https://i.ytimg.com/vi/83wYDzO3CzI/hqdefault.jpg"
},
{
  "id": "excited42",
  "title": "Excitement and Leadership: Inspiring Teams",
  "url": "https://youtu.be/7uk4-2AOaw8?si=tHw2_CGcCQPyezRJ",
  "thumbnail": "https://i.ytimg.com/vi/7uk4-2AOaw8/hqdefault.jpg"
},
{
  "id": "excited43",
  "title": "The Link Between Excitement and Creativity",
  "url": "https://youtu.be/YDnXcgOzadk?si=2yLTSN54Vs-RUjWW",
  "thumbnail": "https://i.ytimg.com/vi/YDnXcgOzadk/hqdefault.jpg"
},
{
  "id": "excited44",
  "title": "Excitement and Decision Making",
  "url": "https://youtu.be/d_Y1oQyIcHU?si=rJfoixEggSUrwaqw",
  "thumbnail": "https://i.ytimg.com/vi/d_Y1oQyIcHU/hqdefault.jpg"
},
{
  "id": "excited45",
  "title": "Excitement and Memory: Enhancing Recall",
  "url": "https://youtube.com/shorts/GaUossEP8kQ?si=HtaQ3WggwbjogK6f",
  "thumbnail": "https://i.ytimg.com/vi/GaUossEP8kQ/hqdefault.jpg"
},
{
  "id": "excited46",
  "title": "Excitement and Stress Management",
  "url": "https://youtu.be/nX4dpGQ5wF4?si=zmBs-CX_VUJxdai8",
  "thumbnail": "https://i.ytimg.com/vi/nX4dpGQ5wF4/hqdefault.jpg"
},

     
    
  
  ],
  RELAXED: [
        { "id": "relaxed1", "title": "Calm Piano Music for Relaxation", "url": "https://www.youtube.com/watch?v=2OEL4P1Rz04", "thumbnail": "https://i.ytimg.com/vi/2OEL4P1Rz04/hqdefault.jpg" },
        { "id": "relaxed2", "title": "Guided Meditation for Deep Relaxation", "url": "https://www.youtube.com/watch?v=inpok4MKVLM", "thumbnail": "https://i.ytimg.com/vi/inpok4MKVLM/hqdefault.jpg" },
        { "id": "relaxed3", "title": "Nature Sounds for Sleep and Relaxation", "url": "https://www.youtube.com/watch?v=OdIJ2x3nxzQ", "thumbnail": "https://i.ytimg.com/vi/OdIJ2x3nxzQ/hqdefault.jpg" },
        { "id": "relaxed4", "title": "Relaxing Jazz Music - Soft Instrumentals", "url": "https://www.youtube.com/watch?v=Dx5qFachd3A", "thumbnail": "https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg" },
        { "id": "relaxed5", "title": "ASMR Sleep Sounds - Whispering & Rain", "url": "https://www.youtube.com/watch?v=3QIfkeA6HBY", "thumbnail": "https://i.ytimg.com/vi/3QIfkeA6HBY/hqdefault.jpg" },
        { "id": "relaxed6", "title": "Slow Breathing Exercise for Anxiety Relief", "url": "https://www.youtube.com/watch?v=aNXKjGFUlMs", "thumbnail": "https://i.ytimg.com/vi/aNXKjGFUlMs/hqdefault.jpg" },
        { "id": "relaxed7", "title": "10-Minute Yoga for Stress Relief", "url": "https://www.youtube.com/watch?v=4C-gxOE0j7s", "thumbnail": "https://i.ytimg.com/vi/4C-gxOE0j7s/hqdefault.jpg" },

          {
            "id": "relaxed12",
            "title": "Mindfulness Meditation for Inner Peace",
            "url": "https://www.youtube.com/watch?v=wGFog-OuFDM",
            "thumbnail": "https://i.ytimg.com/vi/wGFog-OuFDM/hqdefault.jpg"
          },
         
          {
            "id": "relaxed14",
            "title": "Guided Breathing Techniques for Relaxation",
            "url": "https://www.youtube.com/watch?v=_gJ5V525SCk",
            "thumbnail": "https://i.ytimg.com/vi/_gJ5V525SCk/hqdefault.jpg"
          },
         
          {
            "id": "relaxed18",
            "title": "Soothing Rainforest Sounds for Sleep & Study",
            "url": "https://www.youtube.com/watch?v=eKFTSSKCzWA",
            "thumbnail": "https://i.ytimg.com/vi/eKFTSSKCzWA/hqdefault.jpg"
          },
          
          {
            "id": "relaxed20",
            "title": "Chill Lo-Fi Beats for Relaxation & Focus",
            "url": "https://www.youtube.com/watch?v=5qap5aO4i9A",
            "thumbnail": "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg"
          },
          
            {
              "id": "relaxed21",
              "title": "Deep Sleep Music: Delta Waves for Relaxation",
              "url": "https://www.youtube.com/watch?v=1ZYbU82GVz4",
              "thumbnail": "https://i.ytimg.com/vi/1ZYbU82GVz4/hqdefault.jpg"
            },













            {
              "id": "relaxed22",
              "title": "Relaxing Guitar Music - Sleep Music",
              "url": "https://www.youtube.com/watch?v=FjHGZj2IjBk",
              "thumbnail": "https://i.ytimg.com/vi/FjHGZj2IjBk/hqdefault.jpg"
            },

            {
              "id": "relaxed23",
              "title": "Peaceful Flute Music for Meditation",
              "url": "https://www.youtube.com/watch?v=GN5q747x1zI",
              "thumbnail": "https://i.ytimg.com/vi/GN5q747x1zI/hqdefault.jpg"
            },
            {
              "id": "relaxed24",
              "title": "Ambient Space Music for Relaxation",
              "url": "https://www.youtube.com/watch?v=gCWaRhNUvfc",
              "thumbnail": "https://i.ytimg.com/vi/gCWaRhNUvfc/hqdefault.jpg"
            },
            {
              "id": "relaxed25",
              "title": "Chillout Lounge Music - Relaxing Cafe Music",
              "url": "https://www.youtube.com/watch?v=41138QS_lvA",
              "thumbnail": "https://i.ytimg.com/vi/41138QS_lvA/hqdefault.jpg"
            },
          
            {
              "id": "relaxed27",
              "title": "Relaxing Harp Music for Stress Relief",
              "url": "https://www.youtube.com/watch?v=p6wFbdU4Tpc",
              "thumbnail": "https://i.ytimg.com/vi/p6wFbdU4Tpc/hqdefault.jpg"
            },
            {
              "id": "relaxed28",
              "title": "Calming Cello Music for Meditation",
              "url": "https://www.youtube.com/watch?v=K0fkY-pqxVY",
              "thumbnail": "https://i.ytimg.com/vi/K0fkY-pqxVY/hqdefault.jpg"
            },
            {
              "id": "relaxed29",
              "title": "Relaxing Music with Ocean Waves",
              "url": "https://www.youtube.com/watch?v=DXzk5i4Ofe8",
              "thumbnail": "https://i.ytimg.com/vi/DXzk5i4Ofe8/hqdefault.jpg"
            },
            {
              "id": "relaxed30",
              "title": "Soothing Instrumental Music for Spa",
              "url": "https://www.youtube.com/watch?v=QxBRe-zTIUE",
              "thumbnail": "https://i.ytimg.com/vi/QxBRe-zTIUE/hqdefault.jpg"
            },
            {
              "id": "relaxed31",
              "title": "Gentle Rain Sounds for Sleep",
              "url": "https://www.youtube.com/watch?v=q76bMs-NwRk",
              "thumbnail": "https://i.ytimg.com/vi/q76bMs-NwRk/hqdefault.jpg"
            },
            {
              "id": "relaxed32",
              "title": "Tranquil Forest Sounds for Relaxation",
              "url": "https://www.youtube.com/watch?v=8myYyMg1fFE",
              "thumbnail": "https://i.ytimg.com/vi/8myYyMg1fFE/hqdefault.jpg"
            },
            {
              "id": "relaxed33",
              "title": "Soft Piano Music for Stress Relief",
              "url": "https://www.youtube.com/watch?v=WJ3-F02-F_Y",
              "thumbnail": "https://i.ytimg.com/vi/WJ3-F02-F_Y/hqdefault.jpg"
            },
            {
              "id": "relaxed34",
              "title": "Relaxing Music for Yoga and Meditation",
              "url": "https://www.youtube.com/watch?v=iWtFLj6yV1I",
              "thumbnail": "https://i.ytimg.com/vi/iWtFLj6yV1I/hqdefault.jpg"
            },
            {
              "id": "relaxed35",
              "title": "Calm River Sounds for Relaxation",
              "url": "https://www.youtube.com/watch?v=FUhf3SrF3JQ",
              "thumbnail": "https://i.ytimg.com/vi/FUhf3SrF3JQ/hqdefault.jpg"
            },
            {
              "id": "relaxed36",
              "title": "Serene Music for Mindfulness Meditation",
              "url": "https://www.youtube.com/watch?v=EkbM5EfFyME",
              "thumbnail": "https://i.ytimg.com/vi/EkbM5EfFyME/hqdefault.jpg"
            },
            {
              "id": "relaxed37",
              "title": "Peaceful Ambient Music for Relaxation",
              "url": "https://www.youtube.com/watch?v=STbPZzjZynI",
              "thumbnail": "https://i.ytimg.com/vi/STbPZzjZynI/hqdefault.jpg"
            },
            {
              "id": "relaxed38",
              "title": "Healing Tibetan Singing Bowls",
              "url": "https://www.youtube.com/watch?v=x6UITRjhijI",
              "thumbnail": "https://i.ytimg.com/vi/x6UITRjhijI/hqdefault.jpg"
            },
            {
              "id": "relaxed39",
              "title": "Relaxing Nature Sounds with Birdsong",
              "url": "https://www.youtube.com/watch?v=dE8968nQuaI",
              "thumbnail": "https://i.ytimg.com/vi/dE8968nQuaI/hqdefault.jpg"
            },
          

          ],

        
  

NEUTRAL: [
    { id: 'neutral1', title: 'Why Space is Silent', url: 'https://www.youtube.com/watch?v=8a3r-cG8Wic', thumbnail: 'https://i.ytimg.com/vi/8a3r-cG8Wic/hqdefault.jpg' },
    {
      "id": "neutral2",
      "title": "How Planes Fly",
      "url": "https://www.youtube.com/watch?v=p4VHMsIuPmk",
      "thumbnail": "https://i.ytimg.com/vi/p4VHMsIuPmk/hqdefault.jpg"
    },
    

    { id: 'neutral3', title: 'The Mystery of Black Holes', url: 'https://www.youtube.com/watch?v=e-P5IFTqB98', thumbnail: 'https://i.ytimg.com/vi/e-P5IFTqB98/hqdefault.jpg' },
    
          { "id": "neutral1", "title": "The Art of Doing Nothing - A Dutch Tradition", "url": "https://www.youtube.com/watch?v=kkxj5xVLyj0", "thumbnail": "https://i.ytimg.com/vi/kkxj5xVLyj0/hqdefault.jpg" },

  
          {
            "id": "neutral2",
            "title": "A Day in the Life of a Minimalist",
            "url": "https://www.youtube.com/watch?v=tG2GJZcBKOE",
            "thumbnail": "https://i.ytimg.com/vi/tG2GJZcBKOE/hqdefault.jpg"
          },
          {
            "id": "neutral3",
            "title": "Understanding the Basics of Stoicism",
            "url": "https://www.youtube.com/watch?v=R9OCA6UFE-0",
            "thumbnail": "https://i.ytimg.com/vi/R9OCA6UFE-0/hqdefault.jpg"
          },




          
          { "id": "neutral4", "title": "The Science of Everyday Thinking", "url": "https://www.youtube.com/watch?v=R-R0KrXvWbc", "thumbnail": "https://i.ytimg.com/vi/R-R0KrXvWbc/hqdefault.jpg" },
         


          {
            "id": "neutral5",
            "title": "A Walk Through the British Museum",
            "url": "https://www.youtube.com/watch?v=557KIgjTDao",
            "thumbnail": "https://i.ytimg.com/vi/557KIgjTDao/hqdefault.jpg"
          },
          
          { "id": "neutral6", "title": "The History of Typography", "url": "https://www.youtube.com/watch?v=wOgIkxAfJsk", "thumbnail": "https://i.ytimg.com/vi/wOgIkxAfJsk/hqdefault.jpg" },
         

          {
            "id": "neutral7",
            "title": "Exploring the Universe: A Journey Through Space",
            "url": "https://www.youtube.com/watch?v=mO3Q4bRQZ3k",
            "thumbnail": "https://i.ytimg.com/vi/mO3Q4bRQZ3k/hqdefault.jpg"
          },


          { "id": "neutral8", "title": "The Beauty of Mathematics", "url": "https://www.youtube.com/watch?v=YOQb_mtkEEE", "thumbnail": "https://i.ytimg.com/vi/YOQb_mtkEEE/hqdefault.jpg" },
          { "id": "neutral9", "title": "Understanding Human Behavior: Psychology Basics", "url": "https://www.youtube.com/watch?v=vo4pMVb0R6M", "thumbnail": "https://i.ytimg.com/vi/vo4pMVb0R6M/hqdefault.jpg" },
         

          {
            "id": "neutral10",
            "title": "The Evolution of Technology Over the Decades",
            "url": "https://www.youtube.com/watch?v=YFGNXpErBoY",
            "thumbnail": "https://i.ytimg.com/vi/YFGNXpErBoY/hqdefault.jpg"
          },
          

          {
            "id": "neutral2",
            "title": "How Mountains Are Formed",
            "url": "https://www.youtube.com/watch?v=MQoUI5UuA14",
            "thumbnail": "https://i.ytimg.com/vi/MQoUI5UuA14/hqdefault.jpg"
          },

          {
            "id": "neutral3",
            "title": "The Science of Ocean Currents",
            "url": "https://www.youtube.com/watch?v=kTD_NvwR01o",
            "thumbnail": "https://i.ytimg.com/vi/kTD_NvwR01o/hqdefault.jpg"
          },
          {
            "id": "neutral4",
            "title": "Understanding Quantum Physics",
            "url": "https://www.youtube.com/watch?v=Usu9xZfabPM",
            "thumbnail": "https://i.ytimg.com/vi/Usu9xZfabPM/hqdefault.jpg"
          },
          {
            "id": "neutral5",
            "title": "How Plants Communicate",
            "url": "https://www.youtube.com/watch?v=9HiADisBfQ0",
            "thumbnail": "https://i.ytimg.com/vi/9HiADisBfQ0/hqdefault.jpg"
          },
          {
            "id": "neutral6",
            "title": "The History of Mathematics",
            "url": "https://www.youtube.com/watch?v=2No_CMrxBe8",
            "thumbnail": "https://i.ytimg.com/vi/2No_CMrxBe8/hqdefault.jpg"
          },
          {
            "id": "neutral7",
            "title": "Exploring Deep Sea Creatures",
            "url": "https://www.youtube.com/watch?v=EF8C4v7JIbA",
            "thumbnail": "https://i.ytimg.com/vi/EF8C4v7JIbA/hqdefault.jpg"
          },
          {
            "id": "neutral8",
            "title": "How Memory Works",
            "url": "https://www.youtube.com/watch?v=TqFtWwQCzFI",
            "thumbnail": "https://i.ytimg.com/vi/TqFtWwQCzFI/hqdefault.jpg"
          },
          {
            "id": "neutral9",
            "title": "The Formation of Stars",
            "url": "https://www.youtube.com/watch?v=4kJUsNmwwDE",
            "thumbnail": "https://i.ytimg.com/vi/4kJUsNmwwDE/hqdefault.jpg"
          },

{
  "id": "neutral10",
  "title": "Understanding Weather Patterns",
  "url": "https://www.youtube.com/watch?v=xXMU5KyM8YY",
  "thumbnail": "https://i.ytimg.com/vi/xXMU5KyM8YY/hqdefault.jpg"
},



{
  "id": "neutral2",
  "title": "The Physics of Light and Color",
  "url": "https://www.youtube.com/watch?v=KnIualWf6Rs",
  "thumbnail": "https://i.ytimg.com/vi/KnIualWf6Rs/hqdefault.jpg"
},


{
  "id": "neutral4",
  "title": "The Secrets of the Ocean Depths",
  "url": "https://www.youtube.com/watch?v=ubpl78Px1p8",
  "thumbnail": "https://i.ytimg.com/vi/ubpl78Px1p8/hqdefault.jpg"
},
{
  "id": "neutral7",
  "title": "The Evolution of the Universe",
  "url": "https://www.youtube.com/watch?v=3Illx0WkCxU",
  "thumbnail": "https://i.ytimg.com/vi/3Illx0WkCxU/hqdefault.jpg"
},
{
  "id": "neutral8",
  "title": "Understanding the Human Brain",
  "url": "https://www.youtube.com/watch?v=a8Uv1CbUj4k",
  "thumbnail": "https://i.ytimg.com/vi/a8Uv1CbUj4k/hqdefault.jpg"
},

{
  "id": "neutral2",
  "title": "The Science Behind Rainbows",
  "url": "https://www.youtube.com/watch?v=xXMU5KyM8YY",
  "thumbnail": "https://i.ytimg.com/vi/xXMU5KyM8YY/hqdefault.jpg"
},

{
  "id": "neutral13",
  "title": "The Origins of Language",
  "url": "https://www.youtube.com/watch?v=nd5cklw6d6Q",
  "thumbnail": "https://i.ytimg.com/vi/nd5cklw6d6Q/hqdefault.jpg"
},
{
  "id": "neutral14",
  "title": "How Time Works in Physics",
  "url": "https://www.youtube.com/watch?v=AZsmyTE3j9o",
  "thumbnail": "https://i.ytimg.com/vi/AZsmyTE3j9o/hqdefault.jpg"
},
{
  "id": "neutral15",
  "title": "The Science of Sleep",
  "url": "https://www.youtube.com/watch?v=mjDXQbn6lmo",
  "thumbnail": "https://i.ytimg.com/vi/mjDXQbn6lmo/hqdefault.jpg"
},
{
  "id": "neutral16",
  "title": "The Hidden World of Fungi",
  "url": "https://www.youtube.com/watch?v=KH9JVy-u5DQ",
  "thumbnail": "https://i.ytimg.com/vi/KH9JVy-u5DQ/hqdefault.jpg"
},
{
  "id": "neutral17",
  "title": "How the Internet Works",
  "url": "https://www.youtube.com/watch?v=x3c1ih2NJEg",
  "thumbnail": "https://i.ytimg.com/vi/x3c1ih2NJEg/hqdefault.jpg"
},
{
  "id": "neutral18",
  "title": "The History of Writing Systems",
  "url": "https://www.youtube.com/watch?v=HyjLt_RGEww",
  "thumbnail": "https://i.ytimg.com/vi/HyjLt_RGEww/hqdefault.jpg"
},
{
  "id": "neutral19",
  "title": "The Fascinating World of Crystals",
  "url": "https://www.youtube.com/watch?v=liRVvD2fYbc",
  "thumbnail": "https://i.ytimg.com/vi/liRVvD2fYbc/hqdefault.jpg"
},
{
  "id": "neutral20",
  "title": "The Basics of Cryptocurrency",
  "url": "https://www.youtube.com/watch?v=VYWc9dFqROI",
  "thumbnail": "https://i.ytimg.com/vi/VYWc9dFqROI/hqdefault.jpg"
},
{
  "id": "neutral21",
  "title": "The Evolution of the Alphabet",
  "url": "https://www.youtube.com/watch?v=3kGuN8WIGNc",
  "thumbnail": "https://i.ytimg.com/vi/3kGuN8WIGNc/hqdefault.jpg"
},




 
 
{
  "id": "neutral22",
  "title": "How Trains Work",
  "url": "https://www.youtube.com/watch?v=GJbUI2D3rLY",
  "thumbnail": "https://i.ytimg.com/vi/GJbUI2D3rLY/hqdefault.jpg"
},

{
  "id": "neutral23",
  "title": "The Science of Optical Illusions",
  "url": "https://www.youtube.com/watch?v=VYIr40D7wNw",
  "thumbnail": "https://i.ytimg.com/vi/VYIr40D7wNw/hqdefault.jpg"
},
{
  "id": "neutral24",
  "title": "How Music Affects the Brain",
  "url": "https://www.youtube.com/watch?v=HRE624795zU",
  "thumbnail": "https://i.ytimg.com/vi/HRE624795zU/hqdefault.jpg"
},
{
  "id": "neutral25",
  "title": "The Science of Cooking",
  "url": "https://www.youtube.com/watch?v=4gBAjbeUrjU",
  "thumbnail": "https://i.ytimg.com/vi/4gBAjbeUrjU/hqdefault.jpg"
},
{
  "id": "neutral26",
  "title": "The Hidden World of Microscopic Life",
  "url": "https://www.youtube.com/watch?v=Jfe6KYj5s9s",
  "thumbnail": "https://i.ytimg.com/vi/Jfe6KYj5s9s/hqdefault.jpg"
},
{
  "id": "neutral27",
  "title": "The Origins of the Solar System",
  "url": "https://www.youtube.com/watch?v=d-z0eQOEzkE",
  "thumbnail": "https://i.ytimg.com/vi/d-z0eQOEzkE/hqdefault.jpg"
},
],
   
      
  
  CONFUSED:  [
    {
      "id": "confused1",
      "title": "How to Process Your Emotions",
      "url": "https://www.youtube.com/watch?v=b197XOd9S7U",
      "thumbnail": "https://i.ytimg.com/vi/b197XOd9S7U/hqdefault.jpg"
    },
    {
      "id": "confused2",
      "title": "Name It to Tame It: How to Process Emotions",
      "url": "https://www.youtube.com/watch?v=zoCiHlFjo04",
      "thumbnail": "https://i.ytimg.com/vi/zoCiHlFjo04/hqdefault.jpg"
    },
    {
      "id": "confused3",
      "title": "Is Your Mind Confused?",
      "url": "https://www.youtube.com/watch?v=T561LQ9See0",
      "thumbnail": "https://i.ytimg.com/vi/T561LQ9See0/hqdefault.jpg"
    },

    {
      "id": "confused1",
      "title": "Why Do We Feel Confused? - The Psychology Behind It",
      "url": "https://www.youtube.com/watch?v=XEjo50uAsVs",
      "thumbnail": "https://i.ytimg.com/vi/XEjo50uAsVs/hqdefault.jpg"
    },
 
    {
      "id": "confused2",
      "title": "How to Overcome Mental Confusion and Improve Clarity",
      "url": "https://www.youtube.com/watch?v=D6onQw3hWGg",
      "thumbnail": "https://i.ytimg.com/vi/D6onQw3hWGg/hqdefault.jpg"
    },
    {
      "id": "confused3",
      "title": "The Science of Decision Making - Why It’s So Hard",
      "url": "https://www.youtube.com/watch?v=duPUrUuofI0",
      "thumbnail": "https://i.ytimg.com/vi/duPUrUuofI0/hqdefault.jpg"
    },
    {
      "id": "confused4",
      "title": "Understanding Cognitive Dissonance",
      "url": "https://www.youtube.com/watch?v=G1-vaIe2FGM",
      "thumbnail": "https://i.ytimg.com/vi/G1-vaIe2FGM/hqdefault.jpg"
    },
    {
      "id": "confused5",
      "title": "The Paradox of Choice - Why More Is Less",
      "url": "https://www.youtube.com/watch?v=iBVt7zXMT5o",
      "thumbnail": "https://i.ytimg.com/vi/iBVt7zXMT5o/hqdefault.jpg"
    },
    {
      "id": "confused6",
      "title": "How to Think Clearly and Make Better Decisions",
      "url": "https://www.youtube.com/watch?v=Ubn_9Y_dCls",
      "thumbnail": "https://i.ytimg.com/vi/Ubn_9Y_dCls/hqdefault.jpg"
    },
    {
      "id": "confused7",
      "title": "The Psychology of Overthinking",
      "url": "https://www.youtube.com/watch?v=iLlrIi9-NfQ",
      "thumbnail": "https://i.ytimg.com/vi/iLlrIi9-NfQ/hqdefault.jpg"
    },
    {
      "id": "confused8",
      "title": "Why We Get Stuck in Loops of Indecision",
      "url": "https://www.youtube.com/watch?v=s0l25LNmYT8",
      "thumbnail": "https://i.ytimg.com/vi/s0l25LNmYT8/hqdefault.jpg"
    },
    {
      "id": "confused9",
      "title": "Breaking Free from Analysis Paralysis",
      "url": "https://www.youtube.com/watch?v=JdhGp14Y3yY",
      "thumbnail": "https://i.ytimg.com/vi/JdhGp14Y3yY/hqdefault.jpg"
    },
    {
      "id": "confused10",
      "title": "Mental Clarity: How to Stop Feeling Lost",
      "url": "https://www.youtube.com/watch?v=fH7N9YRxMYc",
      "thumbnail": "https://i.ytimg.com/vi/fH7N9YRxMYc/hqdefault.jpg"
    },

    {
      "id": "confused11",
      "title": "How to Stop Feeling Overwhelmed and Confused",
      "url": "https://www.youtube.com/watch?v=nX4dpGQ5wF4",
      "thumbnail": "https://i.ytimg.com/vi/nX4dpGQ5wF4/hqdefault.jpg"
    },


    {
      "id": "confused27",
      "title": "How to Clear Your Mind and Find Inner Peace",
      "url": "https://www.youtube.com/watch?v=sm0i1Y4g_zA",
      "thumbnail": "https://i.ytimg.com/vi/sm0i1Y4g_zA/hqdefault.jpg"
    },


    {
      "id": "confused28",
      "title": "How Your Brain Creates Confusion and How to Stop It",
      "url": "https://www.youtube.com/watch?v=KRPUZzjosnM",
      "thumbnail": "https://i.ytimg.com/vi/KRPUZzjosnM/hqdefault.jpg"
    },
    {
      "id": "confused29",
      "title": "Simple Techniques to Improve Mental Clarity",
      "url": "https://www.youtube.com/watch?v=QtzbFQtbEvc",
      "thumbnail": "https://i.ytimg.com/vi/QtzbFQtbEvc/hqdefault.jpg"
    },
    {
      "id": "confused30",
      "title": "How to Stop Second-Guessing Yourself",
      "url": "https://www.youtube.com/watch?v=zfNj-W6DStg",
      "thumbnail": "https://i.ytimg.com/vi/zfNj-W6DStg/hqdefault.jpg"
    },
    {
      "id": "confused31",
      "title": "How to Stop Being Indecisive and Take Action",
      "url": "https://www.youtube.com/watch?v=K9yDyl_LX4E",
      "thumbnail": "https://i.ytimg.com/vi/K9yDyl_LX4E/hqdefault.jpg"
    },
    {
      "id": "confused32",
      "title": "How to Silence Mental Noise and Find Focus",
      "url": "https://www.youtube.com/watch?v=BQmM95g7n0k",
      "thumbnail": "https://i.ytimg.com/vi/BQmM95g7n0k/hqdefault.jpg"
    },
    {
      "id": "confused33",
      "title": "Why Overthinking is Holding You Back",
      "url": "https://www.youtube.com/watch?v=OPtcNL8mINs",
      "thumbnail": "https://i.ytimg.com/vi/OPtcNL8mINs/hqdefault.jpg"
    },
    {
      "id": "confused34",
      "title": "How to Make Smart Decisions Under Pressure",
      "url": "https://www.youtube.com/watch?v=CqgmozFr_GM",
      "thumbnail": "https://i.ytimg.com/vi/CqgmozFr_GM/hqdefault.jpg"
    },
    {
      "id": "confused35",
      "title": "Why Your Brain Gets Stuck in Confusion",
      "url": "https://www.youtube.com/watch?v=qCuvFzmcIKM",
      "thumbnail": "https://i.ytimg.com/vi/qCuvFzmcIKM/hqdefault.jpg"
    },
    {
      "id": "confused36",
      "title": "How to Overcome Mental Fatigue",
      "url": "https://www.youtube.com/watch?v=3NzdxdNbPSw",
      "thumbnail": "https://i.ytimg.com/vi/3NzdxdNbPSw/hqdefault.jpg"
    },
    {
      "id": "confused37",
      "title": "How to Stop Worrying and Think Clearly",
      "url": "https://www.youtube.com/watch?v=KFVO2_Ej9Eg",
      "thumbnail": "https://i.ytimg.com/vi/KFVO2_Ej9Eg/hqdefault.jpg"
    },
    {
      "id": "confused38",
      "title": "How to Reset Your Brain for Clarity",
      "url": "https://www.youtube.com/watch?v=ymIY9bWHVfY",
      "thumbnail": "https://i.ytimg.com/vi/ymIY9bWHVfY/hqdefault.jpg"
    },
    {
      "id": "confused39",
      "title": "The Secret to Eliminating Mental Clutter",
      "url": "https://www.youtube.com/watch?v=kcd29kqUY48",
      "thumbnail": "https://i.ytimg.com/vi/kcd29kqUY48/hqdefault.jpg"
    },
    {
      "id": "confused40",
      "title": "The Power of a Clear Mind",
      "url": "https://www.youtube.com/watch?v=CmRia5gFOoA",
      "thumbnail": "https://i.ytimg.com/vi/CmRia5gFOoA/hqdefault.jpg"
    },
    {
      "id": "confused41",
      "title": "How to Control Your Thoughts and Gain Mental Strength",
      "url": "https://www.youtube.com/watch?v=IuABATB8gc0",
      "thumbnail": "https://i.ytimg.com/vi/IuABATB8gc0/hqdefault.jpg"
    },
    {
      "id": "confused42",
      "title": "How to Get Out of a Mental Rut",
      "url": "https://www.youtube.com/watch?v=PkXeERCNYVo",
      "thumbnail": "https://i.ytimg.com/vi/PkXeERCNYVo/hqdefault.jpg"
    },
    {
      "id": "confused43",
      "title": "Mental Clarity Hacks for a More Focused Life",
      "url": "https://www.youtube.com/watch?v=PBaFURjVrm0",
      "thumbnail": "https://i.ytimg.com/vi/PBaFURjVrm0/hqdefault.jpg"
    },


  {
    "id": "confused28",
    "title": "How Your Brain Creates Confusion and How to Stop It",
    "url": "https://www.youtube.com/watch?v=KRPUZzjosnM",
    "thumbnail": "https://i.ytimg.com/vi/KRPUZzjosnM/hqdefault.jpg"
},
{
    "id": "confused29",
    "title": "Simple Techniques to Improve Mental Clarity",
    "url": "https://youtu.be/QtzbFQtbEvc?si=tf1QTVEbXUxIolRk",
    "thumbnail": "https://i.ytimg.com/vi/6srHcOg6Lmc/hqdefault.jpg"
},
{
    "id": "confused30",
    "title": "How to Stop Second-Guessing Yourself",
    "url": "https://youtu.be/zfNj-W6DStg?si=3ROK4yeN2Z5qtFmH",
    "thumbnail": "https://i.ytimg.com/vi/zfNj-W6DStg/hqdefault.jpg"
},
{
    "id": "confused31",
    "title": "How to Stop Being Indecisive and Take Action",
    "url": "https://youtu.be/K9yDyl_LX4E?si=ojSP9KRe75gf8pXb",
    "thumbnail": "https://i.ytimg.com/vi/YNOQzE1XTdU/hqdefault.jpg"
},
{
    "id": "confused32",
    "title": "How to Silence Mental Noise and Find Focus",
    "url": "https://youtube.com/shorts/BQmM95g7n0k?si=eDm3ErDb2VUcOlLk",
    "thumbnail": "https://i.ytimg.com/vi/U9IIyJ5n58c/hqdefault.jpg"
},
{
    "id": "confused33",
    "title": "Why Overthinking is Holding You Back",
    "url": "https://youtu.be/OPtcNL8mINs?si=XxmeE-LemCNuOvNK",
    "thumbnail": "https://i.ytimg.com/vi/OPtcNL8mINs/hqdefault.jpg"
},
{
    "id": "confused34",
    "title": "How to Make Smart Decisions Under Pressure",
    "url": "https://youtu.be/CqgmozFr_GM?si=HHuVS6z1FLffmPIUc",
    "thumbnail": "https://i.ytimg.com/vi/GBF9xXhSFRc/hqdefault.jpg"
},
{
    "id": "confused35",
    "title": "Why Your Brain Gets Stuck in Confusion",
    "url": "https://youtu.be/qCuvFzmcIKM?si=aSeAyS2D2_Zc9688",
    "thumbnail": "https://i.ytimg.com/vi/qCuvFzmcIKM/hqdefault.jpg"
},
{
    "id": "confused36",
    "title": "How to Overcome Mental Fatigue",
    "url": "https://youtu.be/3NzdxdNbPSw?si=KRpOuYb7A19Gq4xE",
    "thumbnail": "https://i.ytimg.com/vi/3NzdxdNbPSw/hqdefault.jpg"
},
{
    "id": "confused37",
    "title": "How to Stop Worrying and Think Clearly",
    "url": "https://youtube.com/shorts/KFVO2_Ej9Eg?si=BMFh8cfpM_zb3FQ7",
    "thumbnail": "https://i.ytimg.com/vi/Bzfv-dHsmoY/hqdefault.jpg"
},
{
    "id": "confused38",
    "title": "How to Reset Your Brain for Clarity",
    "url": "https://www.youtube.com/watch?v=ymIY9bWHVfY",
    "thumbnail": "https://i.ytimg.com/vi/ymIY9bWHVfY/hqdefault.jpg"
},
{
    "id": "confused39",
    "title": "The Secret to Eliminating Mental Clutter",
    "url": "https://youtu.be/kcd29kqUY48?si=DoiH8WBbSOEHs9-1",
    "thumbnail": "https://i.ytimg.com/vi/Bi4Z6BT_MsA/hqdefault.jpg"
},
{
    "id": "confused40",
    "title": "The Power of a Clear Mind",
    "url": "https://youtube.com/shorts/CmRia5gFOoA?si=unaTx_tNBVB7pJeq",
    "thumbnail": "https://i.ytimg.com/vi/B5u-SGDfS_s/hqdefault.jpg"
},
{
    "id": "confused41",
    "title": "How to Control Your Thoughts and Gain Mental Strength",
    "url": "https://youtube.com/shorts/IuABATB8gc0?si=DaR0IARI3cJil6KM",
    "thumbnail": "https://i.ytimg.com/vi/hUA_k76x2uE/hqdefault.jpg"
},
{
    "id": "confused42",
    "title": "How to Get Out of a Mental Rut",
    "url": "https://youtu.be/PkXeERCNYVo?si=iAky3hFztJ3ATZmv",
    "thumbnail": "https://i.ytimg.com/vi/PkXeERCNYVo/hqdefault.jpg"
},
{
    "id": "confused43",
    "title": "Mental Clarity Hacks for a More Focused Life",
    "url": "https://youtu.be/PBaFURjVrm0?si=FJ2bRBuT_Uz1S0sR",
    "thumbnail": "https://i.ytimg.com/vi/Hu4Yvq-g7_Y/hqdefault.jpg"
},

  ],


  BORED:  [
    {
      "id": "bored46",
      "title": "Funniest Animal Videos",
      "url": "https://youtu.be/9lVB1-c69Sw?si=OC0DjZsrkcfwZvhc",
      "thumbnail": "https://i.ytimg.com/vi/9lVB1-c69Sw/hqdefault.jpg"
    },
    {
      "id": "bored47",
      "title": "Try Not to Laugh Challenge",
      "url": "https://youtu.be/KIj_xgQDsdQ?si=znsHVTyEoCh0Uh4L",
      "thumbnail": "https://i.ytimg.com/vi/KIj_xgQDsdQ/hqdefault.jpg"
    },
    {
      "id": "bored48",
      "title": "Mind-Blowing Magic Tricks",
      "url": "https://youtu.be/qeDegvpBi_Q?si=tPKzy4YQFLMlqZuw",
      "thumbnail": "https://i.ytimg.com/vi/qeDegvpBi_Q/hqdefault.jpg"
    },
    {
      "id": "bored36",
      "title": "10 Fun Things to Do When You're Bored",
      "url": "https://youtu.be/swwX2RwBbH4?si=fblD4c_rLs3oky-Z",
      "thumbnail": "https://i.ytimg.com/vi/swwX2RwBbH4/hqdefault.jpg"
    },
    {
      "id": "bored37",
      "title": "The Science of Boredom and How to Overcome It",
      "url": "https://youtu.be/C6679vvlZ98?si=lS3U85a0fAhnW5_c",
      "thumbnail": "https://i.ytimg.com/vi/C6679vvlZ98/hqdefault.jpg"
    },
    {
      "id": "bored38",
      "title": "Why Boredom is Actually Good for You",
      "url": "https://youtu.be/LKPwKFigF8U?si=BtSzdsa7RD1pz7nX",
      "thumbnail": "https://i.ytimg.com/vi/LKPwKFigF8U/hqdefault.jpg"
    },
    {
      "id": "bored39",
      "title": "How to Use Boredom to Boost Creativity",
      "url": "https://youtu.be/8LLsaq2NZ7Q?si=muH53Od71V5BgfLx",
      "thumbnail": "https://i.ytimg.com/vi/8LLsaq2NZ7Q/hqdefault.jpg"
    },
    {
      "id": "bored40",
      "title": "The Power of Daydreaming",
      "url": "https://youtu.be/oiAQlDBJ88U?si=-6IENW5jwwYlX8NV",
      "thumbnail": "https://i.ytimg.com/vi/oiAQlDBJ88U/hqdefault.jpg"
    },
    {
      "id": "bored41",
      "title": "How to Stay Productive When You're Bored",
      "url": "https://youtube.com/shorts/qU3V4oO_esY?si=SPoToef5YZnD1mQs",
      "thumbnail": "https://i.ytimg.com/vi/qU3V4oO_esY/hqdefault.jpg"
    },
    {
      "id": "bored42",
      "title": "Why We Get Bored and How to Stop It",
      "url": "https://youtu.be/Qwd25JV-jnU?si=n5VJ87v9R_s2f8_i",
      "thumbnail": "https://i.ytimg.com/vi/Qwd25JV-jnU/hqdefault.jpg"
    },
    {
      "id": "bored43",
      "title": "Creative Hobbies to Try When You're Bored",
      "url": "https://youtu.be/lYoPM46a85U?si=6qgq0hxbuO9KIvXY",
      "thumbnail": "https://i.ytimg.com/vi/lYoPM46a85U/hqdefault.jpg"
    },
    {
      "id": "bored44",
      "title": "ADHD and Boredom",
      "url": "https://youtu.be/CaG5XjyWc8c?si=GJ1JQfC8uUB6bFi6",
      "thumbnail": "https://i.ytimg.com/vi/CaG5XjyWc8c/hqdefault.jpg"
    },
    {
      "id": "bored45",
      "title": "Overcoming Chronic Boredom",
      "url": "https://youtu.be/WKbdRnRMbyc?si=_h8JBJatW7kN2yG1",
      "thumbnail": "https://i.ytimg.com/vi/WKbdRnRMbyc/hqdefault.jpg"
    },
  
      {
        "id": "bored49",
        "title": "Why You Feel Bored in Life // How to Overcome Boredom",
        "url": "https://www.youtube.com/watch?v=i7rklh9Sxh8",
        "thumbnail": "https://i.ytimg.com/vi/i7rklh9Sxh8/hqdefault.jpg"
      },
      {
        "id": "bored50",
        "title": "BOREDOM for Kids: What is Boredom? Complex Emotions for Kids",
        "url": "https://www.youtube.com/watch?v=RYoGhK8D3jE",
        "thumbnail": "https://i.ytimg.com/vi/RYoGhK8D3jE/hqdefault.jpg"
      },
      {
        "id": "bored51",
        "title": "How to End Your Boredom",
        "url": "https://www.youtube.com/watch?v=X0n70Yb3C6U",
        "thumbnail": "https://i.ytimg.com/vi/X0n70Yb3C6U/hqdefault.jpg"
      },
      {
        "id": "bored52",
        "title": "What Boredom Teaches Us | James Danckert | TEDxCambridge",
        "url": "https://www.youtube.com/watch?v=ncIwhKk3smM",
        "thumbnail": "https://i.ytimg.com/vi/ncIwhKk3smM/hqdefault.jpg"
      },
      {
        "id": "bored53",
        "title": "How the Way You Respond to Boredom Changes Your Life",
        "url": "https://www.youtube.com/watch?v=gc7wKr0XkN8",
        "thumbnail": "https://i.ytimg.com/vi/gc7wKr0XkN8/hqdefault.jpg"
      },
      {
        "id": "bored54",
        "title": "Just Be Bored: You'll Change Your Life",
        "url": "https://www.youtube.com/watch?v=aVCFIr8iyf4",
        "thumbnail": "https://i.ytimg.com/vi/aVCFIr8iyf4/hqdefault.jpg"
      },
      {
        "id": "bored55",
        "title": "What Boredom Teaches You",
        "url": "https://www.youtube.com/watch?v=Ky6HHgiNGfU",
        "thumbnail": "https://i.ytimg.com/vi/Ky6HHgiNGfU/hqdefault.jpg"
      },
      {
        "id": "bored56",
        "title": "Overcoming Boredom & Restlessness",
        "url": "https://www.youtube.com/watch?v=CPRFZLqEiyU",
        "thumbnail": "https://i.ytimg.com/vi/CPRFZLqEiyU/hqdefault.jpg"
      },
      {
        "id": "bored57",
        "title": "How to Overcome Boredom | Mel Robbins | Advice",
        "url": "https://www.youtube.com/watch?v=uV6lADnXhmk",
        "thumbnail": "https://i.ytimg.com/vi/uV6lADnXhmk/hqdefault.jpg"
      },
      {
        "id": "bored58",
        "title": "Boredom Explained (Scientifically)",
        "url": "https://www.youtube.com/watch?v=gH2SM7Ar5EY",
        "thumbnail": "https://i.ytimg.com/vi/gH2SM7Ar5EY/hqdefault.jpg"
      },
      {
        "id": "bored59",
        "title": "Beating Boredom",
        "url": "https://www.youtube.com/watch?v=bg_n1ah172U",
        "thumbnail": "https://i.ytimg.com/vi/bg_n1ah172U/hqdefault.jpg"
      },
      {
        "id": "bored60",
        "title": "How Boredom Leads To Greatness",
        "url": "https://www.youtube.com/watch?v=U4eDmWvcmA8",
        "thumbnail": "https://i.ytimg.com/vi/U4eDmWvcmA8/hqdefault.jpg"
      },
      {
        "id": "bored61",
        "title": "Overcoming Boredom with IMPACT Kids Coach",
        "url": "https://www.youtube.com/watch?v=RYSm2evgRjk",
        "thumbnail": "https://i.ytimg.com/vi/RYSm2evgRjk/hqdefault.jpg"
      },
     
    

      
        {
          "id": "bored62",
          "title": "Boredom: The Root of All Evil",
          "url": "https://www.youtube.com/watch?v=8e7rSIv5J9U",
          "thumbnail": "https://i.ytimg.com/vi/8e7rSIv5J9U/hqdefault.jpg"
        },
        {
          "id": "bored63",
          "title": "The Benefits of Boredom",
          "url": "https://www.youtube.com/watch?v=8XOA3-XwTaQ",
          "thumbnail": "https://i.ytimg.com/vi/8XOA3-XwTaQ/hqdefault.jpg"
        },
        {
          "id": "bored64",
          "title": "How to Use Boredom to Your Advantage",
          "url": "https://www.youtube.com/watch?v=3KuNRPnXqX4",
          "thumbnail": "https://i.ytimg.com/vi/3KuNRPnXqX4/hqdefault.jpg"
        },
     
     
     
    
    
      
      
        {
          "id": "bored67",
          "title": "How Boredom Can Lead to Your Most Brilliant Ideas",
          "url": "https://www.youtube.com/watch?v=c73Q8oQmwzo",
          "thumbnail": "https://i.ytimg.com/vi/c73Q8oQmwzo/hqdefault.jpg"
        },

        {
          "id": "bored66",
          "title": "The Science of Boredom: Why We Get Bored and How to Cope",
          "url": "https://www.youtube.com/watch?v=YscMjuVUm_M",
          "thumbnail": "https://i.ytimg.com/vi/YscMjuVUm_M/hqdefault.jpg"
        },

        {
          "id": "bored67",
          "title": "How Boredom Can Lead to Your Most Brilliant Ideas",
          "url": "https://www.youtube.com/watch?v=PH22HOUvbxk",
          "thumbnail": "https://i.ytimg.com/vi/PH22HOUvbxk/hqdefault.jpg"
        },
        {
          "id": "bored68",
          "title": "Why Boredom is Good for You",
          "url": "https://www.youtube.com/watch?v=K710qprgtjo",
          "thumbnail": "https://i.ytimg.com/vi/K710qprgtjo/hqdefault.jpg"
        },
        {
          "id": "bored69",
          "title": "What Boredom Teaches Us | James Danckert | TEDxCambridge",
          "url": "https://www.youtube.com/watch?v=doPbFs5N1iA",
          "thumbnail": "https://i.ytimg.com/vi/doPbFs5N1iA/hqdefault.jpg"
        },
        {
          "id": "bored70",
          "title": "How the Way You Respond to Boredom Changes Your Life",
          "url": "https://www.youtube.com/watch?v=0hn0HjCiNWM",
          "thumbnail": "https://i.ytimg.com/vi/0hn0HjCiNWM/hqdefault.jpg"
        },
        {
          "id": "bored71",
          "title": "How Boredom Leads To Greatness",
          "url": "https://www.youtube.com/watch?v=ZlsE-F45rGs",
          "thumbnail": "https://i.ytimg.com/vi/ZlsE-F45rGs/hqdefault.jpg"
        },
        {
          "id": "bored72",
          "title": "Why Boredom is Good for You - Power of Being Bored",
          "url": "https://www.youtube.com/watch?v=Xuf4w17b2L0",
          "thumbnail": "https://i.ytimg.com/vi/Xuf4w17b2L0/hqdefault.jpg"
        },
        {
          "id": "bored73",
          "title": "The Art of Boredom | Kelly Cleeve | TEDxYouth@Victoria",
          "url": "https://www.youtube.com/watch?v=oXJi1pr4J_g",
          "thumbnail": "https://i.ytimg.com/vi/oXJi1pr4J_g/hqdefault.jpg"
        },
        {
          "id": "bored74",
          "title": "What Boredom Teaches You",
          "url": "https://www.youtube.com/shorts/uJioYQaCPeI",
          "thumbnail": "https://i.ytimg.com/vi/uJioYQaCPeI/hqdefault.jpg"
        },
        {
          "id": "bored75",
          "title": "BOREDOM for Kids: What is Boredom? Complex Emotions for Kids",
          "url": "https://www.youtube.com/watch?v=RkGztLI14nI",
          "thumbnail": "https://i.ytimg.com/vi/RkGztLI14nI/hqdefault.jpg"
        },
        {
          "id": "bored76",
          "title": "How Boredom Helps You Do Your Best Thinking | By TED",
          "url": "https://www.youtube.com/watch?v=II5h6uJPvvs",
          "thumbnail": "https://i.ytimg.com/vi/II5h6uJPvvs/hqdefault.jpg"
        },
        {
          "id": "bored77",
          "title": "The Power of Boredom: How It Can Lead to Your Most Brilliant Ideas",
          "url": "https://www.youtube.com/watch?v=6dsy7BIUC-w",
          "thumbnail": "https://i.ytimg.com/vi/6dsy7BIUC-w/hqdefault.jpg"
        },
        {
          "id": "bored78",
          "title": "Embracing Boredom: The Key to Unlocking Creativity",
          "url": "https://www.youtube.com/shorts/d_Wf8rC6i20",
          "thumbnail": "https://i.ytimg.com/vi/d_Wf8rC6i20/hqdefault.jpg"
        },
        {
          "id": "bored79",
          "title": "The Benefits of Boredom: How It Enhances Creativity",
          "url": "https://www.youtube.com/watch?v=ckxiJDnlmeA",
          "thumbnail": "https://i.ytimg.com/vi/ckxiJDnlmeA/hqdefault.jpg"
        },
        {
          "id": "bored80",
          "title": "Boredom: The Unexpected Path to Creativity",
          "url": "https://www.youtube.com/watch?v=T-pKn41dxkA",
          "thumbnail": "https://i.ytimg.com/vi/T-pKn41dxkA/hqdefault.jpg"
        },


     
    ],
    
   
  SAD:  [



  
    {
      "id": "sad1",
      "title": "Ways to Overcome Sadness",
      "url": "https://www.youtube.com/watch?v=gyQX6bU1NIY",
      "thumbnail": "https://i.ytimg.com/vi/gyQX6bU1NIY/hqdefault.jpg"
    },
    {
      "id": "sad2",
      "title": "Inspirational Stories",
      "url": "https://www.youtube.com/watch?v=MXl1jTBT6fQ",
      "thumbnail": "https://i.ytimg.com/vi/MXl1jTBT6fQ/hqdefault.jpg"
    },
    {
      "id": "sad3",
      "title": "How to Find Hope Again",
      "url": "https://www.youtube.com/watch?v=Stb1mRmnZHQ",
      "thumbnail": "https://i.ytimg.com/vi/Stb1mRmnZHQ/hqdefault.jpg"
    },
    {
      "id": "sad4",
      "title": "Understanding and Dealing with Sadness",
      "url": "https://www.youtube.com/watch?v=Xu1FMCxoEFc",
      "thumbnail": "https://i.ytimg.com/vi/Xu1FMCxoEFc/hqdefault.jpg"
    },
    {
      "id": "sad5",
      "title": "How to Deal with Sadness in Life",
      "url": "https://www.youtube.com/watch?v=rxhC81AwtEA",
      "thumbnail": "https://i.ytimg.com/vi/rxhC81AwtEA/hqdefault.jpg"
    },
    {
      "id": "sad6",
      "title": "The Science Behind Sadness",
      "url": "https://www.youtube.com/watch?v=GOK1tKFFIQI",
      "thumbnail": "https://i.ytimg.com/vi/GOK1tKFFIQI/hqdefault.jpg"
    },
    {
      "id": "sad7",
      "title": "How to Overcome Sadness & Find Happiness",
      "url": "https://www.youtube.com/watch?v=d96akWDnx0w",
      "thumbnail": "https://i.ytimg.com/vi/d96akWDnx0w/hqdefault.jpg"
    },
    {
      "id": "sad8",
      "title": "The Role of Sadness in Emotional Growth",
      "url": "https://www.youtube.com/watch?v=f0oG1J2escU",
      "thumbnail": "https://i.ytimg.com/vi/f0oG1J2escU/hqdefault.jpg"
    },
    {
      "id": "sad9",
      "title": "Why Feeling Sad is Okay",
      "url": "https://www.youtube.com/watch?v=LtKrmKlbcBs",
      "thumbnail": "https://i.ytimg.com/vi/LtKrmKlbcBs/hqdefault.jpg"
    },
    {
      "id": "sad10",
      "title": "Sadness and Mental Health",
      "url": "https://www.youtube.com/watch?v=fWFuQR_Wt4M",
      "thumbnail": "https://i.ytimg.com/vi/fWFuQR_Wt4M/hqdefault.jpg"
    },
    
   
    
    {
      "id": "sad12",
      "title": "The Power of Tears",
      "url": "https://www.youtube.com/watch?v=mzgQxR-rJqM",
      "thumbnail": "https://i.ytimg.com/vi/mzgQxR-rJqM/hqdefault.jpg"
    },
    {
      "id": "sad13",
      "title": "Dealing with Emotional Pain",
      "url": "https://www.youtube.com/watch?v=7L8lpF8X3P4",
      "thumbnail": "https://i.ytimg.com/vi/7L8lpF8X3P4/hqdefault.jpg"
    },
    {
      "id": "sad14",
      "title": "Why Do We Get Sad?",
      "url": "https://www.youtube.com/watch?v=0ORctt5zbTw",
      "thumbnail": "https://i.ytimg.com/vi/0ORctt5zbTw/hqdefault.jpg"
    },
    {
      "id": "sad15",
      "title": "Sadness and Depression: Understanding the Difference",
      "url": "https://www.youtube.com/watch?v=tNwRNmFT7-4",
      "thumbnail": "https://i.ytimg.com/vi/tNwRNmFT7-4/hqdefault.jpg"
    },
    {
      "id": "sad16",
      "title": "How Music Can Help with Sadness",
      "url": "https://www.youtube.com/watch?v=_eXdP7ojSkI",
      "thumbnail": "https://i.ytimg.com/vi/_eXdP7ojSkI/hqdefault.jpg"
    },
    {
      "id": "sad17",
      "title": "How to Turn Sadness into Motivation",
      "url": "https://www.youtube.com/watch?v=SfbvbTlpoLM",
      "thumbnail": "https://i.ytimg.com/vi/SfbvbTlpoLM/hqdefault.jpg"
    },
    {
      "id": "sad18",
      "title": "Coping Strategies for Sadness",
      "url": "https://www.youtube.com/watch?v=Cxsrkryoafs",
      "thumbnail": "https://i.ytimg.com/vi/Cxsrkryoafs/hqdefault.jpg"
    },
    {
      "id": "sad19",
      "title": "How to Support Someone Who is Sad",
      "url": "https://www.youtube.com/watch?v=p2gK9w0Zf0Y",
      "thumbnail": "https://i.ytimg.com/vi/p2gK9w0Zf0Y/hqdefault.jpg"
    },
    {
      "id": "sad20",
      "title": "The Importance of Expressing Sadness",
      "url": "https://www.youtube.com/watch?v=iWlcAylOVNU",
      "thumbnail": "https://i.ytimg.com/vi/iWlcAylOVNU/hqdefault.jpg"
    },

    {
      "id": "sad11",
      "title": "How to Cope with Feeling Down",
      "url": "https://www.youtube.com/watch?v=938fs11PyRU",
      "thumbnail": "https://i.ytimg.com/vi/938fs11PyRU/hqdefault.jpg"
    },
  

    {
      "id": "sad21",
      "title": "Understanding Depression",
      "url": "https://youtu.be/d7NPnvKFs2Y",
      "thumbnail": "https://i.ytimg.com/vi/d7NPnvKFs2Y/hqdefault.jpg"
    },

    {
      "id": "sad22",
      "title": "Coping with Grief and Loss",
      "url": "https://youtu.be/gsYL4PC0hyk",
      "thumbnail": "https://i.ytimg.com/vi/gsYL4PC0hyk/hqdefault.jpg"
    },
    {
      "id": "sad23",
      "title": "How to Heal from Emotional Pain",
      "url": "https://youtube.com/shorts/o57n246sqG4",
      "thumbnail": "https://i.ytimg.com/vi/o57n246sqG4/hqdefault.jpg"
    },
    {
      "id": "sad24",
      "title": "Signs You May Be Depressed",
      "url": "https://youtu.be/jPfnJtkQugQ",
      "thumbnail": "https://i.ytimg.com/vi/jPfnJtkQugQ/hqdefault.jpg"
    },
    {
      "id": "sad25",
      "title": "The Science of Sadness",
      "url": "https://youtu.be/8SfOOsPwwsA",
      "thumbnail": "https://i.ytimg.com/vi/8SfOOsPwwsA/hqdefault.jpg"
    },
    {
      "id": "sad26",
      "title": "Dealing with Loneliness",
      "url": "https://youtu.be/dWS3A2EAwTk",
      "thumbnail": "https://i.ytimg.com/vi/dWS3A2EAwTk/hqdefault.jpg"
    },
    {
      "id": "sad27",
      "title": "Breaking Free from Negative Thoughts",
      "url": "https://youtu.be/A8dTx1co8xA",
      "thumbnail": "https://i.ytimg.com/vi/A8dTx1co8xA/hqdefault.jpg"
    },
    {
      "id": "sad28",
      "title": "The Power of Crying: Why It’s Okay to Feel Sad",
      "url": "https://youtu.be/QGdHJSIr1Z0",
      "thumbnail": "https://i.ytimg.com/vi/QGdHJSIr1Z0/hqdefault.jpg"
    },
    {
      "id": "sad29",
      "title": "How to Stop Overthinking",
      "url": "https://youtu.be/tK2LaefZcy8",
      "thumbnail": "https://i.ytimg.com/vi/tK2LaefZcy8/hqdefault.jpg"
    },
    {
      "id": "sad30",
      "title": "How to Be Happy Again",
      "url": "https://youtube.com/shorts/EGhgPpLEvuk",
      "thumbnail": "https://i.ytimg.com/vi/EGhgPpLEvuk/hqdefault.jpg"
    },
  
    {
      "id": "sad31",
      "title": "Why Do We Feel Sad?",
      "url": "https://www.youtube.com/watch?v=NWc_31Ssc4Q",
      "thumbnail": "https://i.ytimg.com/vi/NWc_31Ssc4Q/hqdefault.jpg"
    },

    {
      "id": "sad32",
      "title": "How to Deal with Emotional Pain",
      "url": "https://www.youtube.com/watch?v=rIxeALw9IYU",
      "thumbnail": "https://i.ytimg.com/vi/rIxeALw9IYU/hqdefault.jpg"
    },
   
    {
      "id": "sad33",
      "title": "How to Heal Your Broken Heart",
      "url": "https://www.youtube.com/watch?v=MvQG73ahY-U",
      "thumbnail": "https://i.ytimg.com/vi/MvQG73ahY-U/hqdefault.jpg"
    },
    
    {
      "id": "sad34",
      "title": "Why You Feel Empty Inside",
      "url": "https://www.youtube.com/watch?v=z-bWCklLVXk",
      "thumbnail": "https://i.ytimg.com/vi/z-bWCklLVXk/hqdefault.jpg"
    },
    {
      "id": "sad35",
      "title": "The Power of NOT Reacting | 12 Habits to Control Your Emotions",
      "url": "https://www.youtube.com/watch?v=skZagPiKQfQ",
      "thumbnail": "https://i.ytimg.com/vi/skZagPiKQfQ/hqdefault.jpg"
    },
    {
      "id": "sad36",
      "title": "The Link Between Sadness and Creativity",
      "url": "https://www.youtube.com/watch?v=CtOKjHgNsQw",
      "thumbnail": "https://i.ytimg.com/vi/CtOKjHgNsQw/hqdefault.jpg"
    },
    {
      "id": "sad37",
      "title": "How to Let Go of Emotional Baggage",
      "url": "https://www.youtube.com/watch?v=1bZUL10ZSAo",
      "thumbnail": "https://i.ytimg.com/vi/1bZUL10ZSAo/hqdefault.jpg"
    },
    {
      "id": "sad38",
      "title": "The Science Behind Crying",
      "url": "https://www.youtube.com/watch?v=YEmMJrJR09E",
      "thumbnail": "https://i.ytimg.com/vi/YEmMJrJR09E/hqdefault.jpg"
    },
    {
      "id": "sad39",
      "title": "Understanding Emotional Numbness",
      "url": "https://www.youtube.com/watch?v=Adlk8E2UoUs",
      "thumbnail": "https://i.ytimg.com/vi/Adlk8E2UoUs/hqdefault.jpg"
    },
    {
      "id": "sad40",
      "title": "How to Heal from a Broken Heart",
      "url": "https://www.youtube.com/watch?v=k0GQSJrpVhM",
      "thumbnail": "https://i.ytimg.com/vi/k0GQSJrpVhM/hqdefault.jpg"
    },




  ],
  ANGRY:  [

    {
      "id": "anger01",
      "title": "Why Do We Get Angry?",
      "url": "https://www.youtube.com/watch?v=0rAngiiXBAc",
      "thumbnail": "https://i.ytimg.com/vi/0rAngiiXBAc/hqdefault.jpg"
    },
    {
      "id": "anger02",
      "title": "How to Control Anger Before It Controls You",
      "url": "https://www.youtube.com/watch?v=XdO5gbt2_5Q",
      "thumbnail": "https://i.ytimg.com/vi/XdO5gbt2_5Q/hqdefault.jpg"
    },
    {
      "id": "anger03",
      "title": "The Science of Anger: Why We Snap",
      "url": "https://www.youtube.com/watch?v=d_5DU5opOFk",
      "thumbnail": "https://i.ytimg.com/vi/d_5DU5opOFk/hqdefault.jpg"
    },
    {
      "id": "anger04",
      "title": "7 Ways to Deal with Anger Constructively",
      "url": "https://www.youtube.com/watch?v=hpK-9WIMxSk",
      "thumbnail": "https://i.ytimg.com/vi/hpK-9WIMxSk/hqdefault.jpg"
    },
    {
      "id": "anger05",
      "title": "How Anger Affects Your Brain & Body",
      "url": "https://www.youtube.com/watch?v=YChizR4RstM",
      "thumbnail": "https://i.ytimg.com/vi/YChizR4RstM/hqdefault.jpg"
    },
    {
      "id": "anger06",
      "title": "Anger Management Techniques That Actually Work",
      "url": "https://www.youtube.com/watch?v=r19_Dq3TOyM",
      "thumbnail": "https://i.ytimg.com/vi/r19_Dq3TOyM/hqdefault.jpg"
    },
    {
      "id": "anger07",
      "title": "The Psychology of Anger: Understanding the Triggers",
      "url": "https://www.youtube.com/watch?v=l3i8SfOk5FU",
      "thumbnail": "https://i.ytimg.com/vi/l3i8SfOk5FU/hqdefault.jpg"
    },
    {
      "id": "anger08",
      "title": "How to Calm Down Instantly When Angry",
      "url": "https://www.youtube.com/watch?v=vG8A9yYt9F0",
      "thumbnail": "https://i.ytimg.com/vi/vG8A9yYt9F0/hqdefault.jpg"
    },
    {
      "id": "anger09",
      "title": "The Root Causes of Anger & How to Overcome It",
      "url": "https://www.youtube.com/watch?v=pvTek0ku73U",
      "thumbnail": "https://i.ytimg.com/vi/pvTek0ku73U/hqdefault.jpg"
    },
    {
      "id": "anger10",
      "title": "Is Anger Always Bad? The Surprising Benefits of Anger",
      "url": "https://www.youtube.com/watch?v=gyYS9dvKRKU",
      "thumbnail": "https://i.ytimg.com/vi/gyYS9dvKRKU/hqdefault.jpg"
    },
    {
      "id": "anger11",
      "title": "How to Stop Getting Angry Over Small Things",
      "url": "https://www.youtube.com/watch?v=3XqtrF9Fjf8",
      "thumbnail": "https://i.ytimg.com/vi/3XqtrF9Fjf8/hqdefault.jpg"
    },
    {
      "id": "anger12",
      "title": "Why You Shouldn't Suppress Anger",
      "url": "https://www.youtube.com/watch?v=mjjHBcF_lp4",
      "thumbnail": "https://i.ytimg.com/vi/mjjHBcF_lp4/hqdefault.jpg"
    },
    {
      "id": "anger13",
      "title": "How Anger Affects Your Relationships",
      "url": "https://www.youtube.com/watch?v=pEnpkJ2TPys",
      "thumbnail": "https://i.ytimg.com/vi/pEnpkJ2TPys/hqdefault.jpg"
    },
    {
      "id": "anger14",
      "title": "5 Psychological Hacks to Control Your Anger",
      "url": "https://www.youtube.com/watch?v=H4WYp9a6Yzg",
      "thumbnail": "https://i.ytimg.com/vi/H4WYp9a6Yzg/hqdefault.jpg"
    },
    {
      "id": "anger15",
      "title": "What Happens in Your Brain When You Get Angry?",
      "url": "https://www.youtube.com/watch?v=1bapIDpSplg",
      "thumbnail": "https://i.ytimg.com/vi/1bapIDpSplg/hqdefault.jpg"
    },
    {
      "id": "anger16",
      "title": "Anger vs. Rage: What’s the Difference?",
      "url": "https://www.youtube.com/watch?v=PcZP0O9SWNk",
      "thumbnail": "https://i.ytimg.com/vi/PcZP0O9SWNk/hqdefault.jpg"
    },
    {
      "id": "anger17",
      "title": "How to Stop Yelling When Angry",
      "url": "https://www.youtube.com/watch?v=JV61dx977dU",
      "thumbnail": "https://i.ytimg.com/vi/JV61dx977dU/hqdefault.jpg"
    },
    {
      "id": "anger18",
      "title": "How Meditation Helps with Anger Management",
      "url": "https://www.youtube.com/watch?v=wkse4PPxkk4",
      "thumbnail": "https://i.ytimg.com/vi/wkse4PPxkk4/hqdefault.jpg"
    },
    {
      "id": "anger19",
      "title": "The Link Between Anger and Stress",
      "url": "https://www.youtube.com/watch?v=2bQNabQupgk",
      "thumbnail": "https://i.ytimg.com/vi/2bQNabQupgk/hqdefault.jpg"
    },
    {
      "id": "anger20",
      "title": "Why Anger Can Be Addictive",
      "url": "https://www.youtube.com/watch?v=rSnMtLXWXgs",
      "thumbnail": "https://i.ytimg.com/vi/rSnMtLXWXgs/hqdefault.jpg"
    },
    {
      "id": "anger21",
      "title": "How to Stop Road Rage",
      "url": "https://www.youtube.com/watch?v=LkQvR9GCNAU",
      "thumbnail": "https://i.ytimg.com/vi/LkQvR9GCNAU/hqdefault.jpg"
    },
    {
      "id": "anger22",
      "title": "How to Respond to an Angry Person",
      "url": "https://www.youtube.com/watch?v=4UjrAENPO3E",
      "thumbnail": "https://i.ytimg.com/vi/4UjrAENPO3E/hqdefault.jpg"
    },









    
    {
      "id": "angry1",
      "title": "How to Stay Calm Under Pressure",
      "url": "https://www.youtube.com/watch?v=CqgmozFr_GM",
      "thumbnail": "https://i.ytimg.com/vi/CqgmozFr_GM/hqdefault.jpg"
    },

    {
      "id": "angry2",
      "title": "The Art of Letting Go",
      "url": "https://www.youtube.com/watch?v=zqqAyPjKfI0",
      "thumbnail": "https://i.ytimg.com/vi/zqqAyPjKfI0/hqdefault.jpg"
    },
    {
      "id": "angry3",
      "title": "Techniques to Control Anger",
      "url": "https://www.youtube.com/watch?v=Yh1-y3TzSO4",
      "thumbnail": "https://i.ytimg.com/vi/Yh1-y3TzSO4/hqdefault.jpg"
    },
    {
      "id": "angry4",
      "title": "How to Control Anger Instantly",
      "url": "https://www.youtube.com/watch?v=tNFpNrakV_k",
      "thumbnail": "https://i.ytimg.com/vi/tNFpNrakV_k/hqdefault.jpg"
    },
    {
      "id": "angry5",
      "title": "The Science of Anger: Why We Get Mad",
      "url": "https://www.youtube.com/watch?v=Pj1Di0xtS1g",
      "thumbnail": "https://i.ytimg.com/vi/Pj1Di0xtS1g/hqdefault.jpg"
    },
    {
      "id": "angry6",
      "title": "Anger Management Techniques That Work",
      "url": "https://www.youtube.com/watch?v=BsVq5R_F6RA",
      "thumbnail": "https://i.ytimg.com/vi/BsVq5R_F6RA/hqdefault.jpg"
    },
    {
      "id": "angry7",
      "title": "How to Stay Calm Under Pressure",
      "url": "https://www.youtube.com/watch?v=8jPQjjsBbIc",
      "thumbnail": "https://i.ytimg.com/vi/8jPQjjsBbIc/hqdefault.jpg"
    },
    {
      "id": "angry8",
      "title": "Why Anger Can Be a Good Thing",
      "url": "https://www.youtube.com/watch?v=mxx-QqEGP7U",
      "thumbnail": "https://i.ytimg.com/vi/mxx-QqEGP7U/hqdefault.jpg"
    },
    {
      "id": "angry9",
      "title": "What to Do When You're Angry",
      "url": "https://www.youtube.com/watch?v=DvvXPl6Rl9Y",
      "thumbnail": "https://i.ytimg.com/vi/DvvXPl6Rl9Y/hqdefault.jpg"
    },
    {
      "id": "angry10",
      "title": "The Psychology of Anger",
      "url": "https://www.youtube.com/watch?v=7DfXa0k6ffw",
      "thumbnail": "https://i.ytimg.com/vi/7DfXa0k6ffw/hqdefault.jpg"
    },
    {
      "id": "angry11",
      "title": "Guided Meditation for Anger Control",
      "url": "https://www.youtube.com/watch?v=HSXcZmUN0OQ",
      "thumbnail": "https://i.ytimg.com/vi/HSXcZmUN0OQ/hqdefault.jpg"
    },
    {
      "id": "angry12",
      "title": "The Power of Emotional Intelligence",
      "url": "https://www.youtube.com/watch?v=auXNnTmhHsk",
      "thumbnail": "https://i.ytimg.com/vi/auXNnTmhHsk/hqdefault.jpg"
    },
    {
      "id": "angry13",
      "title": "How to Reduce Stress and Anger",
      "url": "https://www.youtube.com/watch?v=iYjmXxlcm4U",
      "thumbnail": "https://i.ytimg.com/vi/iYjmXxlcm4U/hqdefault.jpg"
    },

  ],
 
};