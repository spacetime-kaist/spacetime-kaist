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
    images: ['-'],
    link: '-'
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
    images: ['-'],
    link: '-'
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
    images: ['-'],
    link: '-'
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
    images: ['-'],
    link: '-'
  },
];

export default researchData;