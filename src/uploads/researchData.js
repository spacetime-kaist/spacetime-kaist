// This file contains an array of research items
const researchData = [
  {
    id: 1,
    title: 'Urban Region Representation Learning',
    shortTitle: 'Urban Region Representation',
    thumbnail: '/researchImg/1.png',
    link: '/research/lunar-construction',
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
    id: 2,
    title: 'Urban Air Mobility',
    navTitle: 'UAM',
    desc: 'As our first step toward UAM demand forecasting, we considered the case of using existing helipads. We plan to expand our scope in future work to UAM routing, fleet rebalancing and scheduling.',
    thumbnail: '/researchImg/2.png',
    images: ['/researchImg/1-1.jpg'],
    link: '/research/lunar-construction',
    detail: 'This study focuses on identifying suitable locations for highway-transfer Vertiports to integrate Urban Air Mobility (UAM) with existing highway infrastructure. UAM offers an effective solution for enhancing transportation accessibility in the Seoul Metropolitan Area, where conventional transportation often struggle to connect suburban employment zones such as industrial parks. By integrating UAM with ground transportation at highway facilities, an efficient connectivity solution can be achieved for regions with limited transportation options. Our proposed methodology for determining the suitable Vertiport locations utilizes data such as geographic information, origin-destination volume, and travel time. Vertiport candidates are evaluated and selected based on criteria including location desirability, combined transportation accessibility and transportation demand. Applying this methodology to the Seoul metropolitan area, we identify 56 suitable Vertiport locations out of 148 candidates. The proposed methodology offers a strategic approach for the selection of highway-transfer Vertiport locations, enhancing UAM integration with existing transportation systems. Our study provides valuable insights for urban planners and policymakers, with recommendations for future research to include real-time environmental data and to explore the impact of Mobility-as-a-Service on UAM operations. Detailed explanations are available on the following webpage [LINK].',
    period: 'September 2021 ~ September 2022',
  },
  {
    id: 3,
    title: 'Maritime Transportation',
    longTitle: '-',
    shortTitle: '- ',
    desc: 'This research proposes a novel deep learning-based vessel trajectory prediction framework for AIS data using Auxiliary tasks and Convolutional encoders (AIS-ACNet).',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/3.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 4,
    title: 'Traffic Forecasting',
    longTitle: '-',
    shortTitle: '-',
    desc: 'Traffic forecasting problem is a research area in transportation engineering that has flourished over the last couple of decades, and started to garner broader research interest as a key technical enabler of the adaptive traffic management.',
    detail: 'Revealing the hidden patterns shaping the urban environment is essential to understand its dynamics and to make cities smarter. Recent studies have demonstrated that learning the representations of urban regions can be an effective strategy to uncover the intrinsic characteristics of urban areas. However, existing studies lack in incorporating diversity in urban data sources. In this work, we propose heterogeneous urban graph attention network (HUGAT), which incorporates heterogeneity of diverse urban datasets. In HUGAT, heterogeneous urban graph (HUG) incorporates both the geo-spatial and temporal people movement variations in a single graph structure. Given a HUG, a set of meta-paths are designed to capture the rich urban semantics as composite relations between nodes. Region embedding is carried out using heterogeneous graph attention network (HAN). HUGAT is designed to consider multiple learning objectives of city’s geo-spatial and mobility variations simultaneously. In our extensive experiments on NYC data, HUGAT outperformed all the state-of-the-art models. Moreover, it demonstrated a robust generalization capability across the various prediction tasks of crime, average personal income, and bike flow as well as the spatial clustering task.',
    period: 'September 2021 ~ September 2022',
    thumbnail: '/researchImg/4.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 5,
    title: 'UTM and Spatial Analysis',
    longTitle: '-',
    shortTitle: '-',
    desc: 'This research field includes Regionalization for urban air mobility application in metropolitan areas, Density-aware flight planning for multiple agents in urban airspace, ​Cooperative sUAV Collision Avoidance, and so on.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/5.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 6,
    title: 'Transportation Network and Data Representation',
    longTitle: '-',
    shortTitle: '-',
    desc: 'In this research field, we conduct about Traffic Data Representation: ​Resolutions and Structures and Air Route Network as Complex Network.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/6.gif',
    images: ['-'],
    link: '-'
  },
  {
    id: 7,
    title: 'Autonomous Vehicle',
    longTitle: '-',
    shortTitle: '-',
    desc: 'Our study incorporates the individual difference to characterize the workload response on personal basis. & The result shows two groups of subjects, one not showing much evidence of stress and the other exhibiting sufficient stress.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/7.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 8,
    title: 'Traffic Safety',
    longTitle: '-',
    shortTitle: '-',
    desc: 'This research field contains Elderly Pedestrian Safety and Elderly Driver Injury Severity by Seat Positions and Seat-belt Use.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/8.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 9,
    title: 'Aviation System',
    longTitle: '-',
    shortTitle: '-',
    desc: 'Includes air traffic management master plan (NARAE), autonomous logistics and probabilistic air traffic flow management (ATFM).',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/9.png',
    images: ['-'],
    link: '-'
  },
  {
    id: 10,
    title: 'Other Research',
    longTitle: '-',
    shortTitle: '-',
    desc: 'Includes risk factor analysis, accident hot spot study, and EMS response time coverage using historic traffic data.',
    detail: '-',
    period: '-',
    thumbnail: '/researchImg/10.png',
    images: ['-'],
    link: '-'
  },
];

export default researchData;
