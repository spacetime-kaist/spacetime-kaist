const researchData = [
  {
    id: 'urban-region',
    title: 'Urban Region Representation Learning',
    menuTitle: 'Urban Region Representation',
    thumbnail: '/researchImg/1.png',
    desc: 'In this work, we propose heterogeneous urban graph attention network (HUGAT), which incorporates heterogeneity of diverse urban datasets.',
    research:[
      {
        title:'Effective Urban Region Representation Learning Using Heterogeneous Urban Graph Attention Network (HUGAT)',
        date: 'September 2021 ~ September 2022',
        desc: 'Revealing the hidden patterns shaping the urban environment is essential to understand its dynamics and to make cities smarter. Recent studies have demonstrated that learning the representations of urban regions can be an effective strategy to uncover the intrinsic characteristics of urban areas. However, existing studies lack in incorporating diversity in urban data sources. In this work, we propose heterogeneous urban graph attention network (HUGAT), which incorporates heterogeneity of diverse urban datasets. In HUGAT, heterogeneous urban graph (HUG) incorporates both the geo-spatial and temporal people movement variations in a single graph structure. Given a HUG, a set of meta-paths are designed to capture the rich urban semantics as composite relations between nodes. Region embedding is carried out using heterogeneous graph attention network (HAN). HUGAT is designed to consider multiple learning objectives of city’s geo-spatial and mobility variations simultaneously. In our extensive experiments on NYC data, HUGAT outperformed all the state-of-the-art models. Moreover, it demonstrated a robust generalization capability across the various prediction tasks of crime, average personal income, and bike flow as well as the spatial clustering task.',
        images: ['/researchImg/1-1.jpg'],
      }
    ]
  },
  {
    id: 'uam',
    title: 'Urban Air Mobility (UAM)',
    menuTitle: 'UAM',
    desc: 'As our first step toward UAM demand forecasting, we considered the case of using existing helipads. We plan to expand our scope in future work to UAM routing, fleet rebalancing and scheduling.',
    thumbnail: '/researchImg/2.png',
    research:[
      {
        title:'Integrating Urban Air Mobility with Highway Infrastructure: A Strategic Approach for Vertiport Location Selection in the Seoul Metropolitan Area',
        date: '',
        desc: 'This study focuses on identifying suitable locations for highway-transfer Vertiports to integrate Urban Air Mobility (UAM) with existing highway infrastructure. UAM offers an effective solution for enhancing transportation accessibility in the Seoul Metropolitan Area, where conventional transportation often struggle to connect suburban employment zones such as industrial parks. By integrating UAM with ground transportation at highway facilities, an efficient connectivity solution can be achieved for regions with limited transportation options. Our proposed methodology for determining the suitable Vertiport locations utilizes data such as geographic information, origin-destination volume, and travel time. Vertiport candidates are evaluated and selected based on criteria including location desirability, combined transportation accessibility and transportation demand. Applying this methodology to the Seoul metropolitan area, we identify 56 suitable Vertiport locations out of 148 candidates. The proposed methodology offers a strategic approach for the selection of highway-transfer Vertiport locations, enhancing UAM integration with existing transportation systems. Our study provides valuable insights for urban planners and policymakers, with recommendations for future research to include real-time environmental data and to explore the impact of Mobility-as-a-Service on UAM operations. Detailed explanations are available on the following webpage.',
        hyperlink: 'https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=W-lkXroAAAAJ&citation_for_view=W-lkXroAAAAJ:W7OEmFMy1HYC',
        youtube:['https://www.youtube.com/embed/uz03YgCI1MY?si=T9sQkTXhivEiuCxq'],
        images: ['/researchImg/2-1.jpg'],
      },
      {
        title:'Data-driven future demand forecasting for UAM',
        date: '',
        desc: 'As the public interest in UAM is getting higher and the underlying technology for UAM becomes sophisticated, the need to forecast the future demand for UAM increases. As the data-driven demand forecasting method has become more accurate than the traditional modeling-based forecasting method, TRUE lab utilized Seoul taxi GPS data to forecast the potential demand for UAM. Our assumption is based on the idea that part of the long-range taxi trip will be replaced by the emerging mobility service - UAM. As our first step toward UAM demand forecasting, we considered the case of using existing helipads. We plan to expand our scope in future work to UAM routing, fleet rebalancing, and scheduling. For details, please visit our blog.',
        images: ['/researchImg/2-2.jpg'],
      },
       {
        title:'UAM Concept of Operations',
        date: '',
        desc: `Urban Air Mobility (UAM) refers to an aviation transportation system that overcomes the limitations of existing terrestrial transportation methods and enables the transportation of people or cargo in three-dimensional urban airspace through vertical takeoff and landing (VTOL) vehicles, as well as the supporting infrastructure for takeoff and landing. UAM is expected to grow into a new advanced industry in future mobility, with a projected scale of over 700 trillion won over the next 20 years. Consequently, major mobility companies and governments around the world are rapidly joining the technological development efforts. In this context, in the first half of 2020, the Federal Aviation Administration (FAA) and the National Aeronautics and Space Administration (NASA) of the United States each announced specific concepts for UAM operations, known as UAM ConOps and UAM OpsCon Passenger-Carrying Operations, respectively. In line with this global trend, Korea also announced the 'Korean Urban Air Mobility (K-UAM) Roadmap,' including practical operational concepts tailored to the domestic context, as well as a technology development roadmap in the first half of 2020. Additionally, in June, we released the UAM operational concept document. Detailed explanations are available on the following webpage`,
        hyperlink: 'https://sites.google.com/view/urbanairmobility/home?authuser=1&pli=1',
        images: ['/researchImg/2-2.jpg'],
      },
    ]
  },
  {
    id: 'utm',
    title: 'UTM and Spatial Analysis',
    menuTitle: 'UTM',
    desc: 'This research field includes Regionalization for urban air mobility application in metropolitan areas, Density-aware flight planning for multiple agents in urban airspace, ​Cooperative sUAV Collision Avoidance, and so on.',
    thumbnail: '/researchImg/2.png',
    research:[
      {
        title:'Regional for urban air mobility application in metropolitan areas: case studies in San Francisco and New York',
        date: '',
        desc: '​​In this study, as a first step to assess the feasibility of UAM in urban areas, we conduct 3D geodemographic analyses of two major cities in San Francisco, CA and Manhattan, NY. The 3D building footprint data is used to identify the raw available airspace as well as the added spatial restrictions with geofencing. Population data is used to represent the potential customer base by combining the daytime and nighttime population. Since the geospatial and demographic datasets differ in representation, the spatial data is vectorized while population data is available by census tract, spatial information is aggregated in census tracts. In addition, We proposed to group the areas of similar spatial and population characteristics through regionalization. Regionalization is a spatially constrained multi-variate clustering method to group small geographical units (census blocks and tracts in general) into a contiguous region of homogeneous nature. The main benefit of regionalization is to delineate regions of similar characteristics and spatial proximity. Through regionalization, one can better understand the urban space with comprehensive geographic perspective, rather than a small geographical unit of census blocks or tracts. Furthermore, regionalization can also improve geospatial intelligence in urban spaces by delineating the functional neighborhood . In this study, we adopted the SKATER, an efficient regionalization technique that uses minimum spanning tree consisting of a connected tree with no circuits. The intention is to provide a region map of the city that can readily identify regions of similar UAM operational and population characteristics with spatial continuity and feasibility. Based on the regionalization results, correspondence analysis was conducted to translate the compound effect of spatial and population characteristics into feasibility.',
        images: ['/researchImg/2-1.jpg'],
      },
    ]
  },
  {
    id: 'maritime',
    title: 'Maritime Transportation',
    menuTitle: '',
    desc: 'This research proposes a novel deep learning-based vessel trajectory prediction framework for AIS data using Auxiliary tasks and Convolutional encoders (AIS-ACNet).',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/3.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 'traffic-forecasting',
    title: 'Traffic Forecasting',
    longTitle: '-',
    menuTitle: '',
    desc: 'Traffic forecasting problem is a research area in transportation engineering that has flourished over the last couple of decades, and started to garner broader research interest as a key technical enabler of the adaptive traffic management.',
    detail: 'Revealing the hidden patterns shaping the urban environment is essential to understand its dynamics and to make cities smarter. Recent studies have demonstrated that learning the representations of urban regions can be an effective strategy to uncover the intrinsic characteristics of urban areas. However, existing studies lack in incorporating diversity in urban data sources. In this work, we propose heterogeneous urban graph attention network (HUGAT), which incorporates heterogeneity of diverse urban datasets. In HUGAT, heterogeneous urban graph (HUG) incorporates both the geo-spatial and temporal people movement variations in a single graph structure. Given a HUG, a set of meta-paths are designed to capture the rich urban semantics as composite relations between nodes. Region embedding is carried out using heterogeneous graph attention network (HAN). HUGAT is designed to consider multiple learning objectives of city’s geo-spatial and mobility variations simultaneously. In our extensive experiments on NYC data, HUGAT outperformed all the state-of-the-art models. Moreover, it demonstrated a robust generalization capability across the various prediction tasks of crime, average personal income, and bike flow as well as the spatial clustering task.',
    period: 'September 2021 ~ September 2022',
    thumbnail: '/researchImg/4.png',
    images: ['-'],
  },
  {
    id: 'transportation-network',
    title: 'Transportation Network and Data Representation',
    longTitle: '-',
    menuTitle: '',
    desc: 'In this research field, we conduct about Traffic Data Representation: ​Resolutions and Structures and Air Route Network as Complex Network.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/6.gif',
    images: ['-'],
    link: '-'
  },
  {
    id: 'autonomous-vehicle',
    title: 'Autonomous Vehicle',
    longTitle: '-',
    menuTitle: '',
    desc: 'Our study incorporates the individual difference to characterize the workload response on personal basis. & The result shows two groups of subjects, one not showing much evidence of stress and the other exhibiting sufficient stress.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/7.png',
    research:[
      {
        title:'Inferring driver workload with individualization using physiological data',
        date: '',
        desc: 'The ability to measure and detect driver’s workload has been an important research topic in automotive research domain, and started to attract greater interest in recent years in relation to the emerging vehicle technology such as autonomous driving. Our study incorporates the individual difference to characterize the workload response on personal basis. Extensive pre-processing of electroencephalogram (EEG) and electrocardiogram (ECG) signals were carried out to generate features for personalization. The results showed that human workload response is far from homogeneity, nor the driving environment is a sole determinant.',
        list:[],
        images: ['/researchImg/7-1.jpg'],
      },
      {
        title:'Characterizing driver stress using physiological and operational data',
        date: '',
        desc: 'From 53 km Electric vehicle driving experiment of 40 subjects, physiological data including electroencephalogram (EEG) and eye-gazing were obtained along with vehicle operational data such as state of charge, altitude, and speed. The dataset was rich in information, but individual difference and nonlinear patterns made it extremely difficult to draw meaningful insights. As a solution, an information-theoretic framework is proposed to evaluate mutual information between physiological and operational data as well as the entropy of physiological data itself.

              The result shows two groups of subjects, one not showing much evidence of stress and the other exhibiting sufficient stress. Among the subjects who showed sufficient driving, 9 out of the top 10 high EEG-entropy drivers were female, one driver showed a strong pattern of range anxiety, and several showed patterns of uphill climbing anxiety.',
        list:[],
        images: ['/researchImg/7-2.jpg'],
      }
    ]
  },
  {
    id: 'traffic-safety',
    title: 'Traffic Safety',
    longTitle: '-',
    menuTitle: '',
    desc: 'This research field contains Elderly Pedestrian Safety and Elderly Driver Injury Severity by Seat Positions and Seat-belt Use.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/8.png',
    research:[
      {
        title:'Elderly Pedestrian Safety',
        date: '',
        desc: '​Changes in the physical and mental abilities of elderly road users have led to an important question of how to define elderly. With an 8-year collision data set in Seoul, this study investigated the commonality and diversity of pedestrian injuries among the elderly by introducing an additional cutoff age of 75. By employing single and interaction binary logit models, common risk factors were identified for both elderly groups, as well as those that are particularly hazardous to the older-old. With nearly every country experiencing growth in the elderly population, our study strongly suggests that the conventional definition of a single elderly group is no longer relevant and the variety among elderly pedestrians needs to be considered in traffic safety policy.',
        list:[],
        images: ['/researchImg/8-1.jpg'],
      },
      {
        title:'Elderly driver injury severity by seat positions and seat-belt use',
        date: '',
        desc: 'Aging has long been regarded as one of the most critical factors affecting crash injury outcomes. In this study, the confounding effect of occupant age in a vehicle in terms of seat position and seatbelt use was investigated. A multinomial logit framework was adopted to predict two-level injury severity using collision data between 2008 and 2015. The degree of injury severity of elderly occupants was reduced the most with the use of a seatbelt, demonstrating the importance of using seat restraints. The sharp increase in the risk of injury of the older-old group suggests that the age standard of 65 years as the elderly group with regard to traffic safety may require reconsideration due to the growing number of elderly vehicle users on the road.',
        list:[],
      }
    ]
  },
  {
    id: 'aviation',
    title: 'Aviation System',
    longTitle: '-',
    menuTitle: '',
    desc: 'Includes air traffic management master plan (NARAE), autonomous logistics and probabilistic air traffic flow management (ATFM).',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/9.png',
    research:[
      {
        title:'Air Traffic Management Master Plan - NARAE (National ATM Renovation & Enhancement)',
        date: '',
        desc: `2012 marks the 40th anniversary for the Republic of Korea(ROK)’s first trans-pacific flight. Over the past decades, ROK has seen a tremendous growth in air navigation sector fueled by robust economic growth, along with a demonstrated operational capability to handle increasing demand.

              ROK has been actively investing in modernizing of air navigation system, including CNS/ATM, aviation technology, and so on. In 2011, ROK initiated on a transition to the future ATM system and is establishing future ATM plan called NARAE, National ATM Renovation And Enhancement, which means the ‘wing’ in Korean.

              ROK subsequently commissioned the working group in November 2011 as a group of researchers from academia and civil aviation organizations to prepare the draft of NARAE for the future ATM system. True lab developed the ROK’s ATM master plan as below.`,
        images: ['/researchImg/9-1.jpg'],
        list:[],
      },
      {
        title:'Autonomous Logistics',
        date: '',
        desc: `Development of Autonomous Mobile Agent System in Complex Warehouse
      
              Unlike vehicles with men aboard, autonomous vehicles require algorithms for path planning, static obstacle avoidance, dynamic obstacle avoidance, and many more. Especially, algorithms need to be considered for co-working with human workers to easily adapt the system in existing warehouses with lower setup cost.

              Therefore TRUE lab is developing an optimized algorithm for each robot to find the shortest path from origin to destination for each mission while potential conflicts and deadlocks are prevented.

              The goal of this project is to develop an algorithm which enables a large quantity of mobile robots (up to 300) operate in simulation. By having a testbed in a real warehouse and mobile robots specially produced for this project, in 2015-2016 the algorithm will be tested.`,
        images: ['/researchImg/9-2.jpg'],
        list:[],
        images: ['/researchImg/9-3.jpg'],
        youtube:['https://www.youtube.com/embed/z-0NvxDENak?si=AbtzbgWHjJphgGR2'],
        list:[],
      },
      {
        title:'Probabilistic Air Traffic Flow Management (ATFM) in the next generation air transportation system',
        date: '',
        desc: `This research seeks to develop and evaluate both deterministic and stochastic Air Traffic Flow Management (ATFM) optimization models, with the purpose to be utilized in the current and future air transportation systems.

              South Korea, one of leading states of the International Civil Aviation Organization (ICAO), is facing the challenge to modernize its air transportation system as mandated by the organization by 2020.

              This research first addresses shortcomings of the current ATFM system by developing a mathematical model to achieve integrated system management. We also study Probabilistic Air Traffic Management (PATM), which has attracted great interests in the ATM community, and propose a stochastic route optimization model when certain challenges inhibits full utilization of the airspace. Software implementation of developed models to simulate and evaluate effectiveness of the proposed models.`,
        images: ['/researchImg/9-5.jpg'],
        list:[],
      },
      {
        title:'Aviation System Safety Management and Reliability Centered Maintenance Program Development',
        date: '',
        desc: ``,
        list:[],
        images: ['/researchImg/9-6.jpg'],['/researchImg/9-7.jpg'],['/researchImg/9-8.jpg'],
        list:[],
        images: ['/researchImg/9-9.jpg'],
        list:[],
        images: ['/researchImg/9-10.jpg'],
      },
      {
        title:'Impacts of volcanic eruption on aviation system',
        date: '',
        desc: ``,
        list:[],
        images: ['/researchImg/9-11.jpg'],
      },
    ]
  },
  {
    id: 'other',
    title: 'Other Research',
    longTitle: '-',
    menuTitle: '',
    desc: 'Includes risk factor analysis, accident hot spot study, and EMS response time coverage using historic traffic data.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/10.png',
    research:[
      {
        title:'Risk factor analysis',
        date: '',
        desc: '​',
        list:[],
        images: ['/researchImg/10-1.jpg'],
        list:[],
        images: ['/researchImg/10-2.jpg'],
        list:[],
      },
      {
        title:'Accident hot spot study',
        date: '',
        desc: '',
        list:[],
        images: ['/researchImg/10-3.jpg'],
        list:[],
        images: ['/researchImg/10-4.jpg'],
      },
      {
        title:'EMS response time coverage using historic traffic data',
        date: '',
        desc: '',
        list:[];
        images: ['/researchImg/10-5.jpg'],
      },
      {
        title:'Impacts of volcanic eruption on aviation system',
        date: '',
        desc: '',
        list:[],
        images: ['/researchImg/10-6.jpg'],
      },
    ]
  },
];

export default researchData;
