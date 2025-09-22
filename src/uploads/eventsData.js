const eventsData = [
  {
    title: "CAUS Monthly Meeting",
    date: "June 16, 2025, KAIST",
    participants: "Professor Yoonjin Yoon, Professor Uichin Lee, students",
    keywords: "#CAUS #Monthly Seminar",
    photos: ['src/uploads/eventsImg/unnamed(0).jpg', 'src/uploads/eventsImg/unnamed(1).jpg'],
  },
  {
    title: "INFORMS TSL Workshop",
    date: "May 19th-21st, 2025, GLAD Hotel (Yeouido)",
    participants: "Namwoo Kim (Postdoc Researcher), Sungmin Sohn (Ph.D. candidate), Minwoo Jeong (M.S. candidate)",
    keywords: "#INFORMS #TSL",
  },
  {
    title: "CAUS Monthly Meeting",
    date: "May 13, 2025, KAIST",
    participants: "Professor Yoonjin Yoon, Professor Ilchul Moon, Professor Taesik Lee, Professor Minjoon Seo, Professor Changhyun Kwon, Professor Dongman Lee, students",
    keywords: "#CAUS #Monthly Seminar",
  },
  {
    title: "Professor Amy Kim's Visit for CEE seminar",
    date: "March 18, 2025, KAIST",
    participants: "Professor Yoonjin Yoon, Professor Amy Kim, CEE students",
    keywords: "#CEE Seminar",
    desc: `
Amy M. Kim is a Professor of Civil Engineering at the University of British Columbia in Vancouver, on the traditional territories of the Musqueam people.  
With the members of her lab, **UBC Multimodal Mobility Systems**, she investigates how long-distance transportation systems perform in connecting people across large geographies, particularly amid disruptions caused by natural hazards and other climate change-induced events.  

Her work aims to support infrastructure and operational decision-making for climate change adaptation and emergency planning, and to train values-driven, community-minded practitioners and researchers.  

- BASc in Civil Engineering, University of Waterloo  
- MS and PhD, University of California, Berkeley  
- Professional experience in transportation consulting in California and BC
    `,
  },
  {
    title: "Seoul AI Festa",
    date: "March 8~9, 2025, Dongdaemun Design Plaza (DDP)",
    participants: "Professor Yoonjin Yoon, Professor Carlo Ratti (Director of MIT Senseable City Lab), Professor Song Chong (Dean of KAIST Graduate School of AI), Mangi Kim (President of Seoul AI Foundation), Seyun Kim (Research Professor), Minwoo Jeong (M.S. candidate), Juneyoung Ro (M.S. candidate)",
    keywords: "#AI Festa",
  },
  {
    title: "CAUS US Workshop",
    date: "January 13~14, 2025, Stanford University",
    participants: "Professors, leaders, students participating in CAUS",
    keywords: "#CAUS",
  },
  {
    title: "Presentation at TRB Annual Meeting",
    date: "January 5~9, 2025, Washington D.C.",
    participants: "Seyun Kim (Research Professor), Sungmin Sohn (Ph.D. candidate), Donghyun Yoon (Ph.D. candidate), Minwoo Jeong (M.S. candidate)",
    keywords: "#TRB",
  },
  {
    title: "CAUS Regular Meeting - Prof. Changhyun Kwon",
    date: "December 12, 2024, 12:00 pm KST",
    participants: "Prof. Changhyun Kwon, Prof. Yoonjin Yoon, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Minjoon Seo",
    date: "November 27, 2024, 11:00 am KST",
    participants: "Prof. Minjoon Seo, Prof. Yoonjin Yoon, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Taesik Lee",
    date: "November 26, 2024, 17:00 pm KST",
    participants: "Prof. Taesik Lee, Prof. Yoonjin Yoon, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS 전체미팅",
    date: "November 15, 2024, 10:30 am KST",
    participants: "Prof. Yoonjin Yoon, Prof. Dongman Lee, Prof. Jinkyoo Park, Prof. Changhyun Kwon, Prof. Taesik Lee, Dr. Seonghoon Kim (CTO at Motov), students",
    keywords: "#CAUS",
  },
  {
    title: "K-DS Hackathon: 2nd Prize!",
    date: "November 11-13, 2024, Seoul National University Samsung Convention Center",
    participants: "Donghyun Yoon (Ph.D. candidate), Sungmin Sohn (Ph.D. candidate), Juneyoung Ro (M.S. candidate), Seungro Lee (M.S. candidate)",
    keywords: "#Hackathon",
  },
  {
    title: "한국경영과학회 추계학술대회",
    date: "November 8, 2024, 16:00 pm KST, Korea Aerospace University",
    participants: "Prof. Yoonjin Yoon, Seyun Kim (Research Professor), Namwoo Kim (PostDoc Researcher), Sungmin Sohn (Ph.D. candidate), Donghyun Yoon (Ph.D. candidate)",
    keywords: "#한국경영과학회",
  },
  {
    title: "CAUS Regular Meeting - Prof. Jinkyoo Park",
    date: "November 4, 2024, 14:00 pm KST",
    participants: "Prof. Changhyun Kwon, Prof. Seyun Kim, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Yoonjin Yoon",
    date: "October 29, 2024, 18:00 pm KST",
    participants: "Prof. Yoonjin Yoon, Prof. Changhyun Kwon, students",
    keywords: "#CAUS",
  },
  {
    title: "ICTC Workshop on ETRI Human Understanding AI Paper Challenge (IWETRIAI)",
    date: "October 16, 2024, 13:00 pm KST, Ramada Plaza Hotel, Jeju Island",
    participants: "Juneyoung Ro (M.S. Candidate)",
    keywords: "#ICTC",
  },
  {
    title: "CAUS Regular Meeting - Prof. Dongman Lee",
    date: "October 2, 2024, 14:00 pm KST",
    participants: "Prof. Dongman Lee, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Kick-Off Meeting (KAIST and GS E&C)",
    date: "September 25, 2024, 15:00 pm KST",
    participants: "Prof. Yoonjin Yoon, Prof. Changhyun Kwon, Prof. Seyun Kim, Prof. Dongman Lee, Prof. Minjoon Seo",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Taesik Lee",
    date: "September 11, 2024, 14:00 pm KST",
    participants: "Prof. Yoonjin Yoon, Prof. Taesik Lee, students",
    keywords: "#CAUS",
  },
  {
    title: "고속도로 비전 캠퍼스 논문 공모전 장려상 시상식",
    date: "September 6, 2024, 10:00 am KST, 한국도로공사 (Korea Expressway Corporation)",
    participants: "Donghyun Yoon (Ph.D. candidate), Minwoo Jeong (M.S. candidate)",
    keywords: "#한국도로공사",
  },
  {
    title: "CAUS Internal Kick-Off Meeting",
    date: "September 4, 2024, 13:00 pm KST",
    participants: "Prof. Yoonjin Yoon, Prof. Changhyun Kwon, Prof. Taesik Lee, Prof. Dongman Lee, Prof. Jinkyoo Park, Prof. Minjoon Seo",
    keywords: "#CAUS",
  },
  {
    title: "CAUS MoU Signing Ceremony",
    date: "August 22, 2024, 14:30 pm KST",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Changhyun Kwon",
    date: "July 31, 2024, 13:00 pm KST (zoom)",
    participants: "Prof. Changhyun Kwon, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Dongman Lee",
    date: "July 23, 2024, 10:00 am KST",
    participants: "Prof. Dongman Lee, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Minjoon Seo",
    date: "July 19, 2024, 14:00 pm KST (zoom)",
    participants: "Prof. Minjoon Seo, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Regular Meeting - Prof. Taesik Lee",
    date: "July 10, 2024, 13:00 pm KST",
    participants: "Prof. Taesik Lee, students",
    keywords: "#CAUS",
  },
  {
    title: "CAUS Meeting",
    date: "June 21, 2024, 09:00 am KST",
    participants: "Prof. Yoonjin Yoon, Prof. Changhyun Kwon, GS, students",
    keywords: "#CAUS",
  },
  {
    title: "Study group meeting with professors",
    date: "April 22, 2024, 19:00 pm KST",
    participants: "Prof. Jinkyoo Park, Prof. Minjoon Seo, Speaker: Yuyol Shin (Ph.D, Postdoctoral Researcher, KAIST)",
    keywords: "#traffic forecasting",
  },
  {
    title: "Professor Kincho Law's Visit",
    date: "March 21, 2024, 16:00 pm KST",
    participants: "Speaker: Prof. Kincho Law, Professor of Civil and Environmental Engineering, Stanford University",
    keywords: "#civil infrastructures",
    desc: `
**Talk:** Cyber Physical System for Civil Infrastructures
    `,
  },
  {
    title: "Urban@KAIST Urban-X Seminar",
    date: "Dec. 8, 2023, 10:00 am KST",
    participants: "Speaker: Prof. Dongman Lee, Provost and Executive Vice President, KAIST; Professor, School of Computing, KAIST",
    keywords: "#Human flows #Urban space",
    desc: "Understanding Urban State Changes via Human Flow Analysis",
  },
  {
    title: "Urban@KAIST Urban-X Seminar",
    date: "Dec. 1, 2023, 10:00 am KST",
    participants: "Speaker: Prof. Daniel Vignon, Assistant Professor, Civil and Urban Engineering, NYU",
    keywords: "#mobility #policy #economics",
    desc: "Safety, Liability, and Insurance Markets in the Age of Automated Driving",
  },
  {
    title: "Urban@KAIST Urban-X Seminar",
    date: "Nov. 24, 2023, 10:00 am KST",
    participants: "Speaker: Prof. Lisa Lim, Assistant Professor, Civil and Environmental Engineering, KAIST",
    keywords: "#design #health",
    desc: "Improving Health through Design of Cities and Buildings",
  },
  {
    title: "Urban@KAIST Urban-X Seminar",
    date: "Nov. 17, 2023, 10:00 am KST",
    participants: "Speaker: Dr. Boyeong Hong, Associate Research Scholar, NYU Marron Institute of Urban Management; Adjunct Professor, Columbia University",
    keywords: "#mobility #climatechange #health #policy #inequality",
    desc: "Responsible and Responsive City - The Next Phase of Urban Planning",
  },
  {
    title: "Urban@KAIST Urban-X Seminar",
    date: "Nov. 10, 2023, 10:00 am KST",
    participants: "Speaker: Prof. Jihee Kim, Associate Professor, School of Business and Technology Management, KAIST",
    keywords: "#economic development",
    desc: "A Human-machine Collaborative Approach Measures Economic Development Using Satellite Imagery",
  },
  // [... continue adding remaining events in same format ...]
];
export default eventsData;