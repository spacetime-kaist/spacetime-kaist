
const researchData = [
  {
    id: 'urban-heat-urban-sales',
    title: 'Urban Heat, Urban Sales',
    menuTitle: 'Urban Heat, Urban Sales',
    thumbnail: '/researchImg/uhus.png',
    desc: 'This research develops a predictive AI framework using over 300 million urban data points to quantify the economic impact of climate stress on small businesses, introducing a novel "Data Sonification" model to translate complex resilience indicators into accessible auditory patterns.',
    research:[
      {
        title:'Urban Heat, Urban Sales: Artificial Intelligence Predicting the Future of Urban Small-Business Ecosystems under Climate Change',
        date: '~ October 2025',
        hyperlink:'https://05970c0c.slw-6vy.pages.dev/',
        desc: 
`
### AI-Driven Modeling of Urban Economic Resilience to Climate Change

This research initiative introduces an AI-driven framework to predict the impact of climate change on urban small business ecosystems. The study utilizes a large-scale dataset of over 300 million data points, encompassing 96 business sectors across Seoul's 426 administrative districts.
The core methodology involves a high-precision analysis correlating climate factors with sector-specific sales revenue. By quantifying sales volatility during climate stress events (e.g., heatwaves), the team generated 40,896 'Urban Heat Resilience' indicators. A key finding is the significant spatial disparity in climate resilience, with sectors like convenience stores showing vastly different outcomes depending on their location.

The predictive model, developed by KAIST, is demonstrated through an interactive visualization tool that forecasts sales changes under future temperature rise scenarios. This technology is now being considered for joint research and application in other major cities, including Boston and London.

### Innovation in Data Interpretation: Data Sonification

A novel component of this research is the pioneering use of Data Sonification—the conversion of data into sound. In a world-first application for this scale of urban data, researchers employed generative AI to transform the massive dataset of temperature, humidity, and sales into complex auditory patterns. This "Barrier-Free AI" technique translates complex statistics into intuitive sound attributes like pitch, rhythm, and intensity. This approach not only offers a new mode of data interpretation but is also designed for inclusivity, making the information accessible to citizens with visual impairments and children, thereby demonstrating a new potential for human-AI sensory interfaces.

### [Try Out the AI Tool :](https://05970c0c.slw-6vy.pages.dev/)`,
        videos: [['/researchImg/uhus_predict.mp4', 'Sales prediction results'],['/researchImg/uhus_sound.mp4', 'Sonified representation of urban data']]
      }
    ]
  },
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
        images: [['/researchImg/1-1.png'],['/researchImg/1-2.png','/researchImg/1-3.png','/researchImg/1-4.png']],
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
        images: ['/researchImg/2-2.png'],
      },
      {
        title:'Data-driven future demand forecasting for UAM',
        date: '',
        desc: 'As the public interest in UAM is getting higher and the underlying technology for UAM becomes sophisticated, the need to forecast the future demand for UAM increases. As the data-driven demand forecasting method has become more accurate than the traditional modeling-based forecasting method, TRUE lab utilized Seoul taxi GPS data to forecast the potential demand for UAM. Our assumption is based on the idea that part of the long-range taxi trip will be replaced by the emerging mobility service - UAM. As our first step toward UAM demand forecasting, we considered the case of using existing helipads. We plan to expand our scope in future work to UAM routing, fleet rebalancing, and scheduling. For details, please visit our blog.',
        images: ['/researchImg/2-3.png','/researchImg/2-4.png'],
      },
       {
        title:'UAM Concept of Operations',
        date: '',
        desc: `Urban Air Mobility (UAM) refers to an aviation transportation system that overcomes the limitations of existing terrestrial transportation methods and enables the transportation of people or cargo in three-dimensional urban airspace through vertical takeoff and landing (VTOL) vehicles, as well as the supporting infrastructure for takeoff and landing. UAM is expected to grow into a new advanced industry in future mobility, with a projected scale of over 700 trillion won over the next 20 years. Consequently, major mobility companies and governments around the world are rapidly joining the technological development efforts. In this context, in the first half of 2020, the Federal Aviation Administration (FAA) and the National Aeronautics and Space Administration (NASA) of the United States each announced specific concepts for UAM operations, known as UAM ConOps and UAM OpsCon Passenger-Carrying Operations, respectively. In line with this global trend, Korea also announced the 'Korean Urban Air Mobility (K-UAM) Roadmap,' including practical operational concepts tailored to the domestic context, as well as a technology development roadmap in the first half of 2020. Additionally, in June, we released the UAM operational concept document. Detailed explanations are available on the following webpage`,
        hyperlink: 'https://sites.google.com/view/urbanairmobility/home?authuser=1&pli=1',
      },
    ]
  },
  {
    id: 'utm',
    title: 'UTM and Spatial Analysis',
    menuTitle: 'UTM',
    desc: 'This research field includes Regionalization for urban air mobility application in metropolitan areas, Density-aware flight planning for multiple agents in urban airspace, Cooperative sUAV Collision Avoidance, and so on.',
    thumbnail: '/researchImg/5.png',
    research:[
      {
        title:'Regional for urban air mobility application in metropolitan areas: case studies in San Francisco and New York',
        date: '',
        desc: 'In this study, as a first step to assess the feasibility of UAM in urban areas, we conduct 3D geodemographic analyses of two major cities in San Francisco, CA and Manhattan, NY. The 3D building footprint data is used to identify the raw available airspace as well as the added spatial restrictions with geofencing. Population data is used to represent the potential customer base by combining the daytime and nighttime population. Since the geospatial and demographic datasets differ in representation, the spatial data is vectorized while population data is available by census tract, spatial information is aggregated in census tracts. In addition, We proposed to group the areas of similar spatial and population characteristics through regionalization. Regionalization is a spatially constrained multi-variate clustering method to group small geographical units (census blocks and tracts in general) into a contiguous region of homogeneous nature. The main benefit of regionalization is to delineate regions of similar characteristics and spatial proximity. Through regionalization, one can better understand the urban space with comprehensive geographic perspective, rather than a small geographical unit of census blocks or tracts. Furthermore, regionalization can also improve geospatial intelligence in urban spaces by delineating the functional neighborhood . In this study, we adopted the SKATER, an efficient regionalization technique that uses minimum spanning tree consisting of a connected tree with no circuits. The intention is to provide a region map of the city that can readily identify regions of similar UAM operational and population characteristics with spatial continuity and feasibility. Based on the regionalization results, correspondence analysis was conducted to translate the compound effect of spatial and population characteristics into feasibility.',
        images: ['/researchImg/5-1.png'],
      },
      {
        title:'Density-aware flight planning for multiple agents in urban airspace',
        date: '',
        desc: 'The aim of this on-going study is to present a flight planning framework that can be applied in a large-scale map environment, such as city-wide airspace. Two key components of this framework are hierarchical spatial data representation and multi-agent pathfinding algorithm. Choosing an appropriate spatial data structure is crucial for monitoring and planning high-density urban operations in a large-scale map, and we propose octree- and medial axis- based approaches to represent urban airspace. Based on proposed spatial data structures, we adopt and apply a variant of conflict-based search (CBS), proposed by Sharon et al (2015), to assign each agent to a sequence of airspace volumes while taking into account projected traffic density within each volume. Detailed methods and analysis results will be made available in our working paper.',
        youtube:['https://www.youtube.com/embed/p-6a9HdsH8Q?si=SqXkoRQs7igYTcgE', 'https://www.youtube.com/embed/Fm9Q13cD230?si=A0c8pcNLc1aEtDnr'],
      },
      {
        title:'Cooperative sUAV Collision Avoidance',
        date: '',
        desc: `The aim of this study is to present a cooperative collision avoidance approach for sUAV in the low-altitude uncontrolled airspace based on satisficing game theory. By incorporating both the self and cooperative preferences in making individual heading decision, satisficing framework provides a collision avoidance strategy that increases throughput while decreasing unnecessary collisions. Simulation-based sensitivity analysis is conducted with varying satisficing parameters, including number of sUAV agents, minimum separation, action angle, and dual utility parameters of raw preference and negotiation index.
        
**SELECTED REFERENCE**
        
Namwoo Kim, Yoonjin Yoon, "Cooperative sUAV Collision Avoidance Based on Satisficing Theory", International Journal of Aeronautical and Space Sciences, 2019
        `,
        ref: ['Namwoo Kim, Yoonjin Yoon, "Cooperative sUAV Collision Avoidance Based on Satisficing Theory", International Journal of Aeronautical and Space Sciences, 2019'], 
        images: ['/researchImg/5-2.png'],
      },
      {
        title:'Geodemographical Risk Analysis of 3D Urban Space',
        date: '',
        desc: `For application of UAS and UAM in urban area, people and man-mad structures that consisting urban environment should be considered. We analyzed urban space by using census tract based population data and 3d building model data. Highly urbanized areas – Manhattan Island and San Francisco were analyzed for their urban space characteristics.`,
        images: ['/researchImg/5-3.png'],
      },
      {
        title:'Urban Airspace Availability Assessment',
        date: '',
        desc: `One of the key challenges in enabling large-scale UAS operations at low altitude lies in the limited airspace of densely built-up urban environment. Unlike the high-altitude controlled airspace, the geospatial complexity arising from existing static obstacles such as buildings and terrain poses a new challenge in the UAS traffic flow management. Hence, a more adaptive and intelligent approach is necessary to identify airspace that is not only free of obstacles but also usable or operable within an acceptable level of risk.
        
As a first step to airspace capacity management, we propose an airspace availability assessment framework that incorporates the underlying geospatial complexity as well as vehicle operational requirements. Specifically, we utilize two types of geofence - keep-out and keep-in.

This interactive tool enables you to explore the airspace availability in three case study areas - Gangnam, Manhattan, and San Francisco. Using this tool, one can identify and compare usable airspace at given altitude with various geofence parameter combinations.

**SELECTED REFERENCES**

Jungwoo Cho, Yoonjin Yoon, "How to Assess the Capacity of Urban Airspace: A Topological Approach Using Keep-in and Keep-out Geofence", 92, 137-149, Transportation Research, Part C, 2018,  
Method for identifying available airspace for unmanned aerial vehicle operations, Patent filed, Dec 17, 2017, KR 10-2018-0033978`,
        images: ['/researchImg/5-4.png'],
      },
      {
        title:'Horizontal and Vertical Connectivity of Airspace ',
        date: '',
        desc: `Low-level airspace contains existing environment of people and surrounding structures that are sensitive to risks posed by UAS operations. In such environment, not all free airspace is available for operational use. In many literatures, however, UTM airspace is often regarded nearly free of obstacles, and geospatial complexity of airspace arising from obstacles is not fully addressed.

In this study, we present topography map and skeletal graph to interpret underlying geometrical and topological properties of urban airspace. Specifically, we present topographic map to provide a quantitative representation of vertical and horizontal dimension of usable airspace. Also, a skeletal graph is extracted to uncover horizontal and vertical connectivity of airspace. Both methods not only provide a compact and informative abstraction of airspace but also can be used to partition the entire airspace into different levels.


**SELECTED REFERENCES**

Jungwoo Cho, Yoonjin Yoon. "Extraction and Interpretation of Geometrical and Topological Properties of Urban Airspace for UAS Operations". 13th ATM R&D Seminar, 2019`,
        images: [['/researchImg/5-5.png'],['/researchImg/5-6.png']] ,
      },
      {
        title:'UTM: Urban Drone Routing',
        date: '',
        desc:
`- UAV path extraction & visualization in the case study area of Manhattan, NY
- keep-out geofence of 30 meter is applied to mid-town area`,
        youtube:['https://www.youtube.com/embed/dTboepJ5feI?si=BcnqN1BDDJgrcedg',],
      },
    ]
  },
  {
    id: 'maritime',
    title: 'Maritime Transportation',
    menuTitle: '',
    desc: 'This research proposes a novel deep learning-based vessel trajectory prediction framework for AIS data using Auxiliary tasks and Convolutional encoders (AIS-ACNet).',
    thumbnail: '/researchImg/3.png',
    research:[
      {
        title:'Deep Learning Framework for Vessel Trajectory Prediction Using Auxiliary Tasks and Convolutional Networks',
        date: '',
        desc: `The accurate prediction of vessel trajectories plays a pivotal role in various maritime applications, including route planning, collision avoidance, and maritime traffic management. With the exponential growth in vessel traffic and the increasing complexity of maritime operations, there is a pressing need for reliable and efficient methods to forecast vessel movements. Traditional statistical and machine-learning approaches have limitations in capturing the complex spatial-temporal patterns of vessel movements. Deep learning techniques have emerged as a promising solution due to their ability to handle large-scale datasets and capture nonlinear relationships. This paper proposes a novel deep learning-based vessel trajectory prediction framework for AIS data using Auxiliary tasks and Convolutional encoders (AIS-ACNet). The model leverages Automatic Identification System (AIS) data, including geographical positions, and vessel dynamics such as Speed Over Ground (SOG), and Course Over Ground (COG), for trajectory prediction. The AIS-ACNet employs parallel convolutional encoder networks with feature fusion layers. The model is trained with a learning objective that includes auxiliary tasks such as SOG and COG predictions. This framework enhances the model's representative power of vessel trajectory data leading to a better understanding of vessel dynamics and higher trajectory prediction performance. The proposed framework is evaluated on real-world data from the Port of Houston, Texas, USA, and compared to existing models through extensive experiments and ablation studies. The results demonstrate the effectiveness and superiority of AIS-ACNet in accurately predicting vessel trajectories.

**REFERENCE**

- Y. Shin, N. Kim, H. Lee, S.Y. In, M. Hansen, and Y. Yoon (2024), "Deep Learning Framework for Vessel Trajectory Prediction Using Auxiliary Tasks and Convolutional Networks". Engineering Applications of Artificial Intelligence, 132, 107936`,
        images: ['/researchImg/3-1.png','/researchImg/3-2.png','/researchImg/3-3.png'],
      },
    ]
  },
  {
    id: 'traffic-forecasting',
    title: 'Traffic Forecasting',
    menuTitle: '',
    desc: 'Traffic forecasting problem is a research area in transportation engineering that has flourished over the last couple of decades, and started to garner broader research interest as a key technical enabler of the adaptive traffic management.',
    thumbnail: '/researchImg/4.png',
    research:[
      {
        title:'A Novel Graph Convolutional Networks to Progressively Adapt to Online Data',
        date: '',
        desc: `In recent years, graph convolutional networks that possess the ability to adapt to the input data have shown promising results in several studies. In most cases, however, the adaptation has been made during the training phases of the models, which inevitably make the models vulnerable to unexpected traffic conditions such as road closure and traffic accident during the testing phases. In this study, we propose a novel traffic forecasting model, Progressive Graph Convolutional Network (PGCN) to make the model adapt to online traffic data. PGCN constructs a set of graphs by calculating learnable similarity measures among the node signals. The architecture of the model is based on Graph WaveNet. When applied to seven real-world datasets, PGCN consistently achieves state-of-the-art performance. This result shows that PGCN has the ability to generalize in different study areas by progressively adapting to online data.

**SELECTED REFERENCE**

- Y. Shin, Y. Yoon. (2024). [PGCN: Progressive graph convolutional networks for spatial-temporal traffic forecasting](https://ieeexplore.ieee.org/abstract/document/10400973) IEEE Transactions on Intelligent Transportation Systems`,
        images: ['/researchImg/4-1.png'],
      },
      {
        title:'Performance Evaluation of Basic Elements of Deep Neural Network Models for Traffic Forecasting',
        date: '',
        desc: `Since 2014, various studies have proposed deep learning-based models to solve traffic forecasting problems. While earlier approaches have shown more wide range of implementations, the basic elements of the recent models can be categorized into a few groups - that are RNN, convolution, and self-attention for temporal feature extraction, and Graph Convolutional Networks (GCN) and Graph Attention Networks (GAT) for spatial feature extraction. However, there has been little effort to assess the characteristics of each element and make an in-depth evaluation. In this study, we thoroughly evaluated the performance and characteristics of basic elements of traffic forecasting models through extensive and multi-faceted experiments on four real-world datasets. The result reveals that there is no single element that is superior to the others in all aspects. Interesting outcomes include that the convolution-based models show more accurate overall performance than the attention-based models, while the attention-based models show more robustness against abnormal conditions.

**SELECTED REFERENCE**

- Y. Shin, Y. Yoon*, "A Comparative Study on Basic Elements of Deep Learning Models for Spatial-Temporal Traffic Forecasting", AAAI-22 workshop: AI for Transportation, 2022.`,
        images: ['/researchImg/4-2.png'],
      },
      {
        title:'Short-Term Traffic Forecasting Using Graph Convolutional Networks',
        date: '',
        desc: `[TRUE Blog Site](https://sites.google.com/view/trueblog/home)
Traffic forecasting problem is a research area in transportation engineering that has flourished over the last couple of decades, and started to garner broader research interest as a key technical enabler of the adaptive traffic management. The recent surge of Graph Convolutional Networks has led to acute improvement on the performance of traffic forecasting tasks. However, many studies overlook the features that can represent the transportation networks such as speed limit, distance, and flow direction. In our research, we propose Multi-Weight Traffic Graph Convolutional Networks (MW-TGC) to incorporate aforementioned features in a single model and to reflect more spatial dynamicity in traffic forecasting problem. Experiment on two real-world datasets show that the proposed model outperforms the state-of-the-art models.

**SELECTED REFERENCE**

- Y. Shin and Y. Yoon, "Incorporating Dynamicity of Transportation Network With Multi-Weight Traffic Graph Convolutional Network for Traffic Forecasting," in IEEE Transactions on Intelligent Transportation Systems, doi: 10.1109/TITS.2020.3031331.
`,
        images: ['/researchImg/4-3.png'],
      },
    ],
  },
  {
    id: 'transportation-network',
    title: 'Transportation Network and Data Representation',
    menuTitle: 'Transportation Network',
    desc: 'In this research field, we conduct about Traffic Data Representation: Resolutions and Structures and Air Route Network as Complex Network.',
    thumbnail: '/researchImg/6.gif',
    research:[
      {
        title:'Traffic Data Representation: Resolutions and Structures',
        date: '',
        desc: ``,
        images: ['/researchImg/6-1.gif','/researchImg/6-2.gif'],
      },
      {
        title:'Air Route Network as Complex Network',
        date: '',
        desc: 
`Air traffic carried by three major countries in Northeast Asia have significantly increased in the past decade. In contrast to the growing importance, there exist few regional studies on the characteristics of the Air Transport Network (ATN). ATNs have been researched over a couple of recent decades by modeling them as airport networks. Airport networks as virtual networks of directly connected airport pairs essentially model airline service network to exclude the airspace, where most of the operational resources are consumed. In this study, air route network robustness of the rapidly growing Northeast Asian region is assessed based on the node criticality.

**SELECTED REFERENCE**

Seyun Kim, Yoonjin Yoon, "On Node Criticality of the Northeast Asian Air Route Network", Journal of Air Transport Management, 80, 101693, 2019`,
        images: ['/researchImg/6-3.png'],
      },
    ],
  },
  {
    id: 'autonomous-vehicle',
    title: 'Autonomous Vehicle',
    menuTitle: '',
    desc: 'Our study incorporates the individual difference to characterize the workload response on personal basis. & The result shows two groups of subjects, one not showing much evidence of stress and the other exhibiting sufficient stress.',
    thumbnail: '/researchImg/7.png',
    images: ['-'],
    research:[
      {
        title:'Inferring driver workload with individualization using physiological data',
        date: '',
        desc: 
`The ability to measure and detect driver’s workload has been an important research topic in automotive research domain, and started to attract greater interest in recent years in relation to the emerging vehicle technology such as autonomous driving. Our study incorporates the individual difference to characterize the workload response on personal basis. Extensive pre-processing of electroencephalogram (EEG) and electrocardiogram (ECG) signals were carried out to generate features for personalization. The results showed that human workload response is far from homogeneity, nor the driving environment is a sole determinant.

**SELECTED REFERENCE**

- Yuna Noh, "Modeling Individual Differences in Driver Workload Estimation using Physiological Data", Ph.D Thesis, 2018
- Yuna Noh, Yoonjin Yoon, "Personalized stress assessment during real-world electric vehicle driving based on fuzzy c-means clustering using physiological and operational data", under review`,
        images: ['/researchImg/7-1.png'],
      },
      {
        title:'Characterizing driver stress using physiological and operational data',
        date: '',
        desc: 
`From 53 km Electric vehicle driving experiment of 40 subjects, physiological data including electroencephalogram (EEG) and eye-gazing were obtained along with vehicle operational data such as state of charge, altitude, and speed. The dataset was rich in information, but individual difference and nonlinear patterns made it extremely difficult to draw meaningful insights. As a solution, an information-theoretic framework is proposed to evaluate mutual information between physiological and operational data as well as the entropy of physiological data itself.

The result shows two groups of subjects, one not showing much evidence of stress and the other exhibiting sufficient stress. Among the subjects who showed sufficient driving, 9 out of the top 10 high EEG-entropy drivers were female, one driver showed a strong pattern of range anxiety, and several showed patterns of uphill climbing anxiety.

**SELECTED REFERENCE**

Seyun Kim, W. Rhee, D. Choi, Y.J. Jang, Yoonjin Yoon, "Characterizing Driver Stress Using Physiological and Operational Data from Real-world Electric Vehicle Driving Experiment", 19(5), 895-906, International Journal of Automotive Technology, 2018`,
        images: ['/researchImg/7-2.png'],
      }
    ]
  },
  {
    id: 'traffic-safety',
    title: 'Traffic Safety',
    menuTitle: '',
    desc: 'This research field contains Elderly Pedestrian Safety and Elderly Driver Injury Severity by Seat Positions and Seat-belt Use.',
    thumbnail: '/researchImg/8.png',
    research:[
      {
        title:'Elderly Pedestrian Safety',
        date: '',
        desc:
`Changes in the physical and mental abilities of elderly road users have led to an important question of how to define elderly. With an 8-year collision data set in Seoul, this study investigated the commonality and diversity of pedestrian injuries among the elderly by introducing an additional cutoff age of 75. By employing single and interaction binary logit models, common risk factors were identified for both elderly groups, as well as those that are particularly hazardous to the older-old. With nearly every country experiencing growth in the elderly population, our study strongly suggests that the conventional definition of a single elderly group is no longer relevant and the variety among elderly pedestrians needs to be considered in traffic safety policy.
  
**SELECTED REFERENCE**
  
Yuna Noh, Minjae Kim, Yoonjin Yoon, "Elderly pedestrian safety in a rapidly aging society—Commonality and diversity between the younger-old and older-old." Traffic Injury Prevention, 19(8), 874-879, 2018`,
        images: ['/researchImg/8-1.png'],
      },
      {
        title:'Elderly driver injury severity by seat positions and seat-belt use',
        date: '',
        desc: 
`Aging has long been regarded as one of the most critical factors affecting crash injury outcomes. In this study, the confounding effect of occupant age in a vehicle in terms of seat position and seatbelt use was investigated. A multinomial logit framework was adopted to predict two-level injury severity using collision data between 2008 and 2015. The degree of injury severity of elderly occupants was reduced the most with the use of a seatbelt, demonstrating the importance of using seat restraints. The sharp increase in the risk of injury of the older-old group suggests that the age standard of 65 years as the elderly group with regard to traffic safety may require reconsideration due to the growing number of elderly vehicle users on the road.

**SELECTED REFERENCE**

Yuna Noh, Yoonjin Yoon. "Elderly road collision injury outcomes associated with seat positions and seatbelt use in a rapidly aging society - a case study in South Korea", PLoS ONE, 12(8), e0183043, 2017`,
      }
    ]
  },
  {
    id: 'aviation',
    title: 'Aviation System',
    longTitle: '-',
    menuTitle: '',
    desc: 'Includes air traffic management master plan (NARAE), autonomous logistics and probabilistic air traffic flow management (ATFM).',
    thumbnail: '/researchImg/9.png',
    research:[
      {
        title:'Air Traffic Management Master Plan - NARAE (National ATM Renovation & Enhancement)',
        projectsSlug:'narae',
        date: '',
        desc: 
`2012 marks the 40th anniversary for the Republic of Korea(ROK)'s first trans-pacific flight. Over the past decades, ROK has seen a tremendous growth in air navigation sector fueled by robust economic growth, along with a demonstrated operational capability to handle increasing demand.

ROK has been actively investing in modernizing of air navigation system, including CNS/ATM, aviation technology, and so on. In 2011, ROK initiated on a transition to the future ATM system and is establishing future ATM plan called NARAE, National ATM Renovation And Enhancement, which means the ‘wing’ in Korean.

ROK subsequently commissioned the working group in November 2011 as a group of researchers from academia and civil aviation organizations to prepare the draft of NARAE for the future ATM system. True lab developed the ROK’s ATM master plan as below.

![9-1](/researchImg/narae.jpg)

### **Implementation Plan**

![9-1](/researchImg/9-1.png)`,
        footnote:
`**Period**: 2011.12~2012.06

**Funding**: MOLIT

**Team**: Ohhoun Kwon, Kyowon Song, Donghoun Lee, Eunhye Kim

**R&D Partnership**: Korea Civil Aviation Development Association (KADA)`,
      },
      {
        title:'Autonomous Logistics',
        projectsSlug:'autonomous-logistics',
        date: '',
        desc: 
`### **Development of Autonomous Mobile Agent System in Complex Warehouse**

Unlike vehicles with men aboard, autonomous vehicles require algorithms for path planning, static obstacle avoidance, dynamic obstacle avoidance, and many more. Especially, algorithms need to be considered for co-working with human workers to easily adapt the system in existing warehouses with lower setup cost.

Therefore TRUE lab is developing an optimized algorithm for each robot to find the shortest path from origin to destination for each mission while potential conflicts and deadlocks are prevented.

The goal of this project is to develop an algorithm which enables a large quantity of mobile robots (up to 300) operate in simulation. By having a testbed in a real warehouse and mobile robots specially produced for this project, in 2015-2016 the algorithm will be tested.

![9-2](/researchImg/9-2.png)

### **Development**

Breadth First Search algorithm can be modified to be adopted in three-dimensional space with discrete time windows. Similar to Amazon's Kiva system, the algorithm generates paths for multi mobile robots, and check if any cell is overlapped by more than one robots. If there is a conflict, it finds another path which is the second shortest. This is repeated until all conflicts are resolved maintaining the shortest path as much as possible.

![9-3](/researchImg/9-3.png)

### **Simulation Example**`,

        youtube:['https://www.youtube.com/embed/z-0NvxDENak?si=AbtzbgWHjJphgGR2'],
                footnote:
`**Period**: 2014.06~2017.05

**Funding**: KAIA

**Team**: Yuna Noh, Seyun Kim

**R&D Partnership**: Urban Robotics Lab (URL, KAIST), Korea Electronics Technology Institute (KETI), Nsquare, CJ Korea Express`,

      },
      {
        title:'Probabilistic Air Traffic Flow Management (ATFM) in the next generation air transportation system',
        projectsSlug:'atfm',
        date: '',
        desc: 
`This research seeks to develop and evaluate both deterministic and stochastic Air Traffic Flow Management (ATFM) optimization models, with the purpose to be utilized in the current and future air transportation systems.

South Korea, one of leading states of the International Civil Aviation Organization (ICAO), is facing the challenge to modernize its air transportation system as mandated by the organization by 2020.

This research first addresses shortcomings of the current ATFM system by developing a mathematical model to achieve integrated system management. We also study Probabilistic Air Traffic Management (PATM), which has attracted great interests in the ATM community, and propose a stochastic route optimization model when certain challenges inhibits full utilization of the airspace. Software implementation of developed models to simulate and evaluate effectiveness of the proposed models.

### **Result**

![9-5](/researchImg/9-5.png)

### **Expected Contribution**

- Conduct a leading research in the PATM area, which is one of the main focus of ATM research communities worldwide, and set out the opportunity to become a leading country in the future ATM
- Provide systematic solution to address airspace congestion
- Redefine the aviation as one of the green transportation mode through the optimal ATFM, which will result in the reduction of carbon footprint of the aviation and increase of the fuel efficiency`,
        footnote:
`**Period**: 2011.05~2014.04

**Funding**: National Research Foundation of Korea (NRF)

**Team**: Ohhoun Kwon, Kyowon Song, Donghoun Lee`,
      },
      {
        title:'Aviation System Safety Management and Reliability Centered Maintenance Program Development',
        projectsSlug:'aviation-system-safety-management',
        date: '',
        desc: 
`- The goal of this research is to develop SMS tools for service providers and policymakers to achieve proactive safety management in accordance with ICAO guideline. 
- TRUE is participating on a project of development of risk model and related techniques to assess risks in the aviation organizations both in quantitative and qualitative way: direction of collecting safety data for risk analysis and risk assessment, methodology of risk assessment using safety database, and developing state safety indicators.

### CATS, ESD Model

![9-6](/researchImg/9-6.png)

### ICAO- Risk Matrix Model

![9-7](/researchImg/9-7.png)

### FAA - Risk Matrix Model

![9-8](/researchImg/9-8.png)

### KAIST-Risk Model

**1. Worst/Most Credible Risk Matrix method**
- Identify both of the most frequent risk level and the worst risk level by hazard
- The risk levels are visually shown on risk matrix.

**2. Cromatography method**
- Represent probability distribution of severity by hazard into stacked bar chart. 
- Provide insights into overall risk level by hazard, but does not provide immediate risk assessment


**3. Risk Scoring**
- Likelihood value from existing risk matrix’s likelihood value
- Severity value from weighted sum of the number of occurrence by severity level
- Useful in quantitative comparison of risks among hazards

![9-9](/researchImg/9-9.png)`,
        footnote:
`**Period**: 2011.12 ~ 2015.06

**Funding**: KAIA

**Team**: Ohhoun Kwon, Yuna Noh, Jiseon Lee, Donghoun Lee, Eunhye Kim, Eunseok Kim

**Patents**:
-  Aviation safety risk assessment method based on hazard matrix and apparatus for the same.  Korea Domestic Patent Application.    App. No. 10-2014-0105376  (2014.08.13)
- Software: Aviation Risk Identification and Assessment (ARIA)

**R&D Partnership**:

![9-10](/researchImg/9-10.png)`,
      },
      {
        title:'Impacts of volcanic eruption on aviation system',
        date: '',
        desc: 
`- The ash cloud from the Eyjafjallajokull volcano in Iceland caused a significant impact on aviation industry on April 14, 2010. Airports across Europe were closed, and at least 17,000 flights a day were cancelled for over a week. Overall 100,000 flights were cancelled and 10 million passengers were unable to board their flights during this week. After Iceland case, there have been many studies trying to address aviation industry impact of Volcanic Ash. However, most of the volcanic eruption scenario studies have limitations.
- In TRUE lab, we analyze the damage of the airports and number of the cancelled flights depend on the hypothetical case of Mt. Baegdu eruption model to derive a predicted flights path and diffusion distance of volcanic ash. This research analyzes the effect of volcanic ash to air traffic and airport by quantification value by assessing volcanic ash concentration and its altitude.`,
        images: ['/researchImg/9-11.png'],
      },
    ]
  },
  {
    id: 'other',
    title: 'Other Research',
    menuTitle: '',
    desc: 'Includes risk factor analysis, accident hot spot study, and EMS response time coverage using historic traffic data.',
    detail: 'Transportation data has grown exponentially in the past decades, and opened a new channel to analyze and understand numerous common interests in the domain. At TRUE, we utilize multiple data sources for collision analysis and prediction, including feature selection of injury severity prediction, high collision area classification, and post-collision response. ',
    thumbnail: '/researchImg/10.png',
    research:[
      {
        title:'Risk factor analysis',
        date: '',
        desc:
`There were numbers of studies related to risk factor analysis done in TRUE from 2011.

The studies contain :

- Risk factor analysis with respect to injury severity
- Risk factor analysis with respect to cellphone usage
- Risk factor analysis of highway accident with respect to cost severity
- Risk factor analysis for fatal crash
- Aged pedestrian safety study

### **Risk factor analysis with respect to injury severity**

- Many recent road traffic safety studies are focusing on the analysis of risk factors that impact fatality and injury level of traffic accidents. While there are well known factors that affect accident severity such as drug usage and drinking, still there are numerous risk factors that needs to be discovered to affect the severity. 
- In this research, Naïve Bayes classifier method and the decision tree classifier method were used to reveal the relative importance of the data fields with respect to the resulting severity level.
- Some of high-ranking risk factors were found to be having strong interdependency, and it was revealed that only a few numbers of risk factors dominate the severity level.

![10-1](/researchImg/10-1.png)

### **Risk factor analysis with respect to cellphone usage**

- Along with the development of IT industry, cellphone usage while driving is becoming one of the major concerns in traffic safety. While cellphone using popularity is growing, there are many cities banning handheld cellphone usage while driving and the efficiency of this banning policy is a controversial topic. By performing turning point analysis technique based on the frequentist and Bayesian approach, it was revealed that the law was critical to the reduction of cellphone-related collisions.

![10-2](/researchImg/10-2.png)

### **Risk factor analysis of highway accident with respect to cost severity**

- Current of damage cost calculation of traffic accidents is based only on insurance compensation. This means that the damage cost of road equipment is being ignored, and there is no efficient resolution being prepared to reduce the traffic accidents.
- Our research team used a decision tree analysis that considers dependencies between the data fields in order to analyze the relationship between the accident features and the occurrence of damage cost about traffic facilities and road equipment. By using CART algorithm based decision tree classifier, we figured out that cause of accident, accident type, accident location, lane, linearity of road, and road condition are main variables that affects the damage cost. Also, situations that are highly likely to cause high equipment damage cost were extracted from the data.

### **Other researches related to the risk factor analysis**
- In addition to the research mentioned above, there are several other risk factor analysis studies such as fatal accident-focused risk analysis, and risk factor analysis about aged pedestrians
`,
      },
      {
        title:'Accident hot spot study',
        date: '',
        desc:
`There were numbers of studies related to accident hotspot study

- DB Fusion
- Hotspot clustering study
- Factor-wise accident hotspot analysis

### **DB fusion**

- Various kinds of traffic-related data are being collected and managed from many agencies. Some of these large-scale traffic DB including traffic volume, flow speed, or public transportation DB are available to public. Accident hotspots (High Collision Concentration Locations, HCCL) researches that only considered accident history DB have limitations in reliability and accuracy due to its insufficient information. 
- TRUE Lab is working on the fusion of collision history DB from SWITRS with real-time traffic information data from PeMS in order to construct integrated collision DB that provides both environmental factors and driving behavior factors. Combining different kinds of traffic DB will lead to the mutual supplementation of data reliability, offering analysis result of higher credibility.

![10-3](/researchImg/10-3.png)

### **Factor-wise accident hotspot analysis**

- Current concept of accident hotspot is explained as HCCL (High Collision Concentration Location), which is determined by counting the accident frequency along absolute post-mile of the road. However, this method does not consider the severity and the cause of the accidents.
- In TRUE lab, we focused on factor-wise accident research which enables evaluation of accident in both frequency and severity, using nonparametric models and clustering algorithms.

![10-4](/researchImg/10-4.png)`,
      },
      {
        title:'EMS response time coverage using historic traffic data',
        date: '',
        desc:
`- In the Emergency Medical Service (EMS), it is widely recognized that the response time - the time from receipt of an emergency call to arrival at the patient location, highly affects the patient survival rate. Response time consists of two components: pre-travel delay and travel time. The pre-travel delay is the amount of time between an emergency call and the vehicle mobilization, while the travel time is the time between the vehicle mobilization and arrival at the patient location.
- Between the two components of response time, travel time addresses the larger portion in most cases, and is highly dependent on road traffic condition. There have been numerous researches to analyse the impact of traffic condition to emergency response time based on vehicle speed. However, travel speeds are assumed to be constant in most cases, and variations in travel speed due to conditions common to the road traffic system such as commute hour congestion are not properly addressed.  
- In this research, time-varying speeds are defined for each street segment within a street network based on the historic traffic data. We propose a GIS-based method to calculate the k-minute travel time contour to represent the response time coverage, incorporating time-of-day and day-of-week effect on travel time in Seoul, South Korea. `,
        images: [['/researchImg/10-5.png']],
      },
      {
        title:'Impacts of volcanic eruption on aviation system',
        date: '',
        desc:
`- The ash cloud from the Eyjafjallajokull volcano in Iceland caused a significant impact on aviation industry on April 14, 2010. Airports across Europe were closed, and at least 17,000 flights a day were cancelled for over a week. Overall 100,000 flights were cancelled and 10 million passengers were unable to board their flights during this week. After Iceland case, there have been many studies trying to address aviation industry impact of Volcanic Ash. However, most of the volcanic eruption scenario studies have limitations.
- In TRUE lab, we analyze the damage of the airports and number of the cancelled flights depend on the hypothetical case of Mt. Baegdu eruption model to derive a predicted flights path and diffusion distance of volcanic ash. This research analyzes the effect of volcanic ash to air traffic and airport by quantification value by assessing volcanic ash concentration and its altitude.`,
        images: [['/researchImg/10-6.png']],
      },
    ]
  },
];

export default researchData;