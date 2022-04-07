export type dataKey = {
  title:string;
  value:string;
  position: number | undefined;
}

export const dataKeys: dataKey[] = [
  {
    title: 'UUID',
    value: 'id',
    position: undefined,
  },
  {
    title: 'First Name',
    value: 'firstName',
    position: 0,
  },
  {
    title: 'Last Name',
    value: 'lastName',
    position: 1,
  },
  {
    title: 'Start Date',
    value: 'startDate',
    position: 2,
  },
  {
    title: 'Department',
    value: 'department',
    position: 3,
  },
  {
    title: 'Date of Birth',
    value: 'dateOfBirth',
    position: 4,
  },
  {
    title: 'Street',
    value: 'street',
    position: 5,
  },
  {
    title: 'City',
    value: 'city',
    position: 6,
  },
  {
    title: 'State',
    value: 'state',
    position: 7,
  },
  {
    title: 'Zip Code',
    value: 'zipCode',
    position: 8,
  },
];

export const employees = [
  {
    id: '369710cb-bf45-4b9e-8891-227081c40b7f',
    firstName: 'Prince',
    lastName: 'Botsford',
    dateOfBirth: '09/12/1982',
    startDate: '12/09/2021',
    department: 'Sales',
    street: '8053 Brady Cove',
    city: 'The Hammocks',
    state: 'Rhode Island',
    zipCode: '41228',
  },
  {
    id: '6664f953-8d7c-49a8-ab88-caf2b30b4498',
    firstName: 'Jeromy',
    lastName: 'Anderson',
    dateOfBirth: '03/12/1974',
    startDate: '04/16/2018',
    department: 'Sales',
    street: '60436 Kiehn Fords',
    city: 'Glendora',
    state: 'Kentucky',
    zipCode: '05492',
  },
  {
    id: '04747420-715b-4fe8-ade6-3328d7fc9afa',
    firstName: 'Lauryn',
    lastName: 'Tremblay',
    dateOfBirth: '02/08/1972',
    startDate: '11/19/2019',
    department: 'Marketing',
    street: '6528 Schinner Locks',
    city: 'Hayward',
    state: 'Nebraska',
    zipCode: '86719',
  },
  {
    id: '8192d51d-ba70-42b5-ab65-007ab3d4ff15',
    firstName: 'Karelle',
    lastName: 'Boyer',
    dateOfBirth: '11/29/1964',
    startDate: '06/21/2018',
    department: 'Sales',
    street: '545 Bernhard Walk',
    city: 'Torrance',
    state: 'Washington',
    zipCode: '54636',
  },
  {
    id: 'bc53e2c9-137d-4965-bec8-872df46a99e8',
    firstName: 'Myles',
    lastName: 'Armstrong',
    dateOfBirth: '06/04/1975',
    startDate: '01/31/2013',
    department: 'Human Resources',
    street: '790 Johathan Pike',
    city: 'Lakewood',
    state: 'New Hampshire',
    zipCode: '53848',
  },
  {
    id: '4a44869f-f589-4cf9-a690-d13c6a22094a',
    firstName: 'Estelle',
    lastName: 'Lakin',
    dateOfBirth: '06/18/1979',
    startDate: '10/05/2019',
    department: 'Sales',
    street: '97925 Anderson Fields',
    city: 'Palm Beach Gardens',
    state: 'Hawaii',
    zipCode: '90162',
  },
  {
    id: 'c5f5f016-1ec6-4576-91a5-1a3e6c44b370',
    firstName: 'Daphnee',
    lastName: 'Skiles',
    dateOfBirth: '03/11/1997',
    startDate: '08/14/2013',
    department: 'Sales',
    street: '92333 Jaskolski Route',
    city: 'Charleston',
    state: 'Utah',
    zipCode: '21286',
  },
  {
    id: '14392f26-04ad-4d20-8d56-b0b1f43a6b7c',
    firstName: 'Rafaela',
    lastName: 'Powlowski',
    dateOfBirth: '02/03/1970',
    startDate: '08/19/2013',
    department: 'Sales',
    street: '1542 Roberts Expressway',
    city: 'Chino',
    state: 'Alaska',
    zipCode: '67073',
  },
  {
    id: '437e3410-2c0c-4dcb-b690-e60f4e92caef',
    firstName: 'Terrill',
    lastName: 'Pfannerstill',
    dateOfBirth: '12/08/1991',
    startDate: '08/26/2021',
    department: 'Engineering',
    street: '1689 Nicklaus Road',
    city: 'Chesapeake',
    state: 'Rhode Island',
    zipCode: '00278',
  },
  {
    id: 'f7ed2b2a-22a1-4e43-a9e8-33c954515cb9',
    firstName: 'Marjory',
    lastName: 'Collins',
    dateOfBirth: '03/03/1990',
    startDate: '10/09/2018',
    department: 'Marketing',
    street: '811 Yoshiko Camp',
    city: 'Brownsville',
    state: 'California',
    zipCode: '97518',
  },
  {
    id: 'b165c8e4-960b-4ef9-9495-103bdf8f988c',
    firstName: 'Alexandria',
    lastName: 'Labadie',
    dateOfBirth: '03/03/1992',
    startDate: '02/23/2013',
    department: 'Sales',
    street: '43271 Hickle Shoal',
    city: 'Watsonville',
    state: 'North Carolina',
    zipCode: '36995',
  },
  {
    id: '48a13a56-1ebf-44d0-b4c9-e8d3c824b99b',
    firstName: 'Emmanuelle',
    lastName: 'Roberts',
    dateOfBirth: '10/22/1993',
    startDate: '01/21/2021',
    department: 'Sales',
    street: '50368 Will Course',
    city: 'Kirkland',
    state: 'Michigan',
    zipCode: '68702',
  },
  {
    id: '42a844ce-ce30-4512-8547-a1865e13fd87',
    firstName: 'Holden',
    lastName: 'Wiza',
    dateOfBirth: '04/09/1991',
    startDate: '05/06/2018',
    department: 'Marketing',
    street: '5067 Tiara Camp',
    city: 'Lawrence',
    state: 'Alabama',
    zipCode: '40708',
  },
  {
    id: 'fce2351e-0546-4f22-9795-f9d1230abde5',
    firstName: 'Jessyca',
    lastName: 'Welch',
    dateOfBirth: '03/30/1967',
    startDate: '05/19/2015',
    department: 'Marketing',
    street: '230 Madonna Corner',
    city: 'Paradise',
    state: 'Connecticut',
    zipCode: '58388',
  },
  {
    id: '947e9880-dbc0-4b69-b77a-2e2bb85f8066',
    firstName: 'Tamia',
    lastName: 'Dooley',
    dateOfBirth: '08/14/1974',
    startDate: '05/19/2020',
    department: 'Human Resources',
    street: '6366 Estella Port',
    city: 'Concord',
    state: 'Vermont',
    zipCode: '80211',
  },
  {
    id: '2559317e-96d1-40d7-a36b-ace598dcc078',
    firstName: 'Raina',
    lastName: 'Lehner',
    dateOfBirth: '02/05/1966',
    startDate: '02/13/2015',
    department: 'Engineering',
    street: '444 Mack Oval',
    city: 'Union City',
    state: 'Hawaii',
    zipCode: '67795',
  },
  {
    id: '1faa537b-35c1-4766-9575-73236c4efe9c',
    firstName: 'Jerald',
    lastName: 'Witting',
    dateOfBirth: '09/28/1976',
    startDate: '04/02/2018',
    department: 'Marketing',
    street: '027 Milford Run',
    city: 'Vancouver',
    state: 'Mississippi',
    zipCode: '49466',
  },
  {
    id: 'dac01764-2e1c-4d7d-b7b1-5fc455d843d7',
    firstName: 'Casimir',
    lastName: 'Orn',
    dateOfBirth: '07/27/1981',
    startDate: '12/17/2013',
    department: 'Engineering',
    street: '5905 Lemuel Squares',
    city: 'Redondo Beach',
    state: 'Maine',
    zipCode: '59025',
  },
  {
    id: '1d0fb508-412a-481e-b6a8-21570e17bf98',
    firstName: 'Bert',
    lastName: 'Johnson',
    dateOfBirth: '06/21/1968',
    startDate: '10/19/2021',
    department: 'Human Resources',
    street: '541 Olson Alley',
    city: 'Haltom City',
    state: 'Kansas',
    zipCode: '81710',
  },
  {
    id: 'c6b74b30-3f14-4a7a-87dc-de665b7d519f',
    firstName: 'Celine',
    lastName: 'Cole',
    dateOfBirth: '10/22/2002',
    startDate: '11/16/2020',
    department: 'Marketing',
    street: '874 Laverne Viaduct',
    city: 'Salina',
    state: 'Oregon',
    zipCode: '54016',
  },
  {
    id: '9f530941-bbe8-4aec-9468-276ba11d2823',
    firstName: 'Leland',
    lastName: 'Smitham',
    dateOfBirth: '12/18/1987',
    startDate: '01/22/2018',
    department: 'Sales',
    street: '7514 Wisozk Harbors',
    city: 'Missoula',
    state: 'Arkansas',
    zipCode: '93886',
  },
  {
    id: '673ad9ea-e0dd-487a-b4c2-fa1b0da24184',
    firstName: 'Louie',
    lastName: 'Homenick',
    dateOfBirth: '11/21/1965',
    startDate: '12/16/2013',
    department: 'Human Resources',
    street: '63588 Shana Wall',
    city: 'Mesa',
    state: 'Minnesota',
    zipCode: '67231',
  },
  {
    id: '0ece5823-bb65-4deb-be0b-26fbf35ed643',
    firstName: 'Kacie',
    lastName: 'Hermiston',
    dateOfBirth: '05/31/1972',
    startDate: '06/16/2012',
    department: 'Marketing',
    street: '32934 Jaskolski Land',
    city: 'Athens-Clarke County',
    state: 'Maine',
    zipCode: '42994',
  },
  {
    id: 'cfc4c1ce-3417-489e-bb95-478eb5da30fc',
    firstName: 'Jazmin',
    lastName: 'Green',
    dateOfBirth: '12/30/1987',
    startDate: '03/22/2012',
    department: 'Engineering',
    street: '89404 Tamara Highway',
    city: 'Wilson',
    state: 'Pennsylvania',
    zipCode: '71289',
  },
  {
    id: '73a32382-855e-4a02-8fa4-18f56f771655',
    firstName: 'Cordie',
    lastName: 'Kassulke',
    dateOfBirth: '04/02/1971',
    startDate: '04/20/2021',
    department: 'Engineering',
    street: '115 Dillan Field',
    city: 'Newport Beach',
    state: 'Maryland',
    zipCode: '77820',
  },
  {
    id: '3fa84c06-6e82-4719-b47c-2a34ea43f78b',
    firstName: 'Kenyatta',
    lastName: 'Ortiz',
    dateOfBirth: '10/09/1991',
    startDate: '12/31/2016',
    department: 'Marketing',
    street: '3524 Thomas Point',
    city: 'Tulsa',
    state: 'New York',
    zipCode: '15290',
  },
  {
    id: '8a11e90a-1b13-4765-a649-dea7b5ad0623',
    firstName: 'Lily',
    lastName: 'Quigley',
    dateOfBirth: '11/30/1972',
    startDate: '03/24/2015',
    department: 'Engineering',
    street: '046 Jaleel Street',
    city: 'Richland',
    state: 'Virginia',
    zipCode: '04541',
  },
  {
    id: '363ae8d3-bee1-4aa9-85e0-de9a794b6460',
    firstName: 'Ethel',
    lastName: 'Nader',
    dateOfBirth: '07/15/1992',
    startDate: '07/06/2016',
    department: 'Marketing',
    street: '8224 Wilderman Groves',
    city: 'Lincoln',
    state: 'Wyoming',
    zipCode: '68513',
  },
  {
    id: '61dbb088-64b4-4822-8096-baa901f2d5ac',
    firstName: 'Logan',
    lastName: 'Hickle',
    dateOfBirth: '02/06/1967',
    startDate: '05/16/2021',
    department: 'Marketing',
    street: '291 Celestino Courts',
    city: 'Centennial',
    state: 'Kansas',
    zipCode: '11075',
  },
  {
    id: '168b7445-2098-49b2-96d6-7e7530982da2',
    firstName: 'Dock',
    lastName: 'Pollich',
    dateOfBirth: '07/25/1996',
    startDate: '03/29/2021',
    department: 'Sales',
    street: '1432 Brakus Cliffs',
    city: 'Pueblo',
    state: 'Kentucky',
    zipCode: '27003',
  },
  {
    id: '8faebbdb-4337-41c6-b6ba-62167c0bb9f9',
    firstName: 'Breanne',
    lastName: 'Fritsch',
    dateOfBirth: '01/15/1987',
    startDate: '05/30/2021',
    department: 'Sales',
    street: '820 Vincenzo Ranch',
    city: 'Jonesboro',
    state: 'North Dakota',
    zipCode: '39503',
  },
  {
    id: 'e07bdd31-0aea-4748-8e89-a2dfeabc99de',
    firstName: 'Eleanora',
    lastName: 'Streich',
    dateOfBirth: '02/02/1974',
    startDate: '02/10/2013',
    department: 'Marketing',
    street: '40776 Ena Island',
    city: 'Oceanside',
    state: 'Massachusetts',
    zipCode: '79102',
  },
  {
    id: '79417999-d7cd-45bb-a874-97fa367e471a',
    firstName: 'Antonia',
    lastName: 'Padberg',
    dateOfBirth: '08/18/1982',
    startDate: '10/13/2021',
    department: 'Engineering',
    street: '8990 Janessa Keys',
    city: 'Waltham',
    state: 'Michigan',
    zipCode: '69387',
  },
  {
    id: 'bf986e5a-a04e-4300-b891-6a45619db449',
    firstName: 'Hilbert',
    lastName: 'Hirthe',
    dateOfBirth: '05/04/2003',
    startDate: '10/28/2013',
    department: 'Human Resources',
    street: '57250 Rogahn Land',
    city: 'Grapevine',
    state: 'Connecticut',
    zipCode: '09793',
  },
  {
    id: 'c5ad926a-3be2-4208-964b-cd3e6c46d12c',
    firstName: 'Mathias',
    lastName: 'Cummings',
    dateOfBirth: '10/14/1995',
    startDate: '03/27/2020',
    department: 'Sales',
    street: '839 Bergnaum Throughway',
    city: 'Salem',
    state: 'Utah',
    zipCode: '53267',
  },
  {
    id: '206eefc7-ff89-46ba-949d-10b71cfd8605',
    firstName: 'Mariam',
    lastName: 'Rodriguez',
    dateOfBirth: '09/09/1983',
    startDate: '05/19/2012',
    department: 'Sales',
    street: '080 Mante Trace',
    city: 'New Britain',
    state: 'New York',
    zipCode: '91035',
  },
  {
    id: '5c80acbd-7ffa-48f9-a502-2eccad943e23',
    firstName: 'Charley',
    lastName: 'Kohler',
    dateOfBirth: '06/30/1969',
    startDate: '10/01/2015',
    department: 'Sales',
    street: '60125 Randal Gardens',
    city: 'South Hill',
    state: 'New Mexico',
    zipCode: '96143',
  },
  {
    id: 'bb5cd217-d5e3-4e73-bd46-476c3da253f8',
    firstName: 'Kaycee',
    lastName: 'Simonis',
    dateOfBirth: '03/27/1987',
    startDate: '08/05/2020',
    department: 'Marketing',
    street: '9478 Talia Island',
    city: 'Redmond',
    state: 'Idaho',
    zipCode: '08072',
  },
  {
    id: 'ee01cdc9-ddae-4a99-91b5-9f541e032010',
    firstName: 'Maci',
    lastName: "O'Connell",
    dateOfBirth: '10/07/1988',
    startDate: '09/27/2021',
    department: 'Human Resources',
    street: '554 Kayden Ports',
    city: 'Utica',
    state: 'Idaho',
    zipCode: '18398',
  },
  {
    id: '8af12d80-9d00-47c3-975b-0747128887b6',
    firstName: 'Josie',
    lastName: 'Mueller',
    dateOfBirth: '10/20/1980',
    startDate: '06/14/2021',
    department: 'Sales',
    street: '1207 Keeling Flats',
    city: 'Las Vegas',
    state: 'North Carolina',
    zipCode: '47342',
  },
  {
    id: '6f731c6c-eee7-4729-8349-dd4c915487ee',
    firstName: 'Paul',
    lastName: 'Larson',
    dateOfBirth: '12/11/1962',
    startDate: '05/04/2015',
    department: 'Sales',
    street: '67872 Freeman Circle',
    city: 'Rochester',
    state: 'Arkansas',
    zipCode: '83550',
  },
  {
    id: '670d0a28-9c61-4b3a-830c-57dc858586b9',
    firstName: 'Clyde',
    lastName: 'Stoltenberg',
    dateOfBirth: '01/01/1980',
    startDate: '11/23/2018',
    department: 'Marketing',
    street: '90436 Corwin Lights',
    city: 'New Braunfels',
    state: 'New York',
    zipCode: '74809',
  },
  {
    id: '3e641879-240c-4f91-9e47-45c21f623228',
    firstName: 'Henri',
    lastName: 'Boyer',
    dateOfBirth: '08/15/1990',
    startDate: '07/01/2021',
    department: 'Human Resources',
    street: '5829 Noah Stravenue',
    city: 'Topeka',
    state: 'Hawaii',
    zipCode: '21883',
  },
  {
    id: '6a5bc3f7-4102-435b-812d-6bdd6cdbbc91',
    firstName: 'Alisa',
    lastName: 'Cartwright',
    dateOfBirth: '09/07/1976',
    startDate: '09/30/2020',
    department: 'Human Resources',
    street: '60124 Bechtelar Key',
    city: 'Azusa',
    state: 'Connecticut',
    zipCode: '86560',
  },
  {
    id: '6171875a-833e-4db1-967e-ad845d380072',
    firstName: 'Crawford',
    lastName: 'Ziemann',
    dateOfBirth: '12/21/1994',
    startDate: '08/30/2021',
    department: 'Human Resources',
    street: '82872 Yvette Corner',
    city: 'Jurupa Valley',
    state: 'Delaware',
    zipCode: '08692',
  },
  {
    id: '94f01243-7d7f-40d9-98c6-5fec6fdadc79',
    firstName: 'Lazaro',
    lastName: 'Tromp',
    dateOfBirth: '02/12/1968',
    startDate: '07/26/2016',
    department: 'Sales',
    street: '711 Jeromy Radial',
    city: 'Austin',
    state: 'New Mexico',
    zipCode: '82051',
  },
  {
    id: 'b9421be3-0ba0-4420-9c4b-abc91f2f1978',
    firstName: 'Kathlyn',
    lastName: 'Kihn',
    dateOfBirth: '12/01/1979',
    startDate: '06/16/2016',
    department: 'Sales',
    street: '0029 Funk Views',
    city: 'St. Cloud',
    state: 'New Jersey',
    zipCode: '40054',
  },
  {
    id: 'd71488d0-4ec5-4036-b86d-fe2e3fcd4c0d',
    firstName: 'Antonette',
    lastName: 'Bogisich',
    dateOfBirth: '10/18/1961',
    startDate: '07/27/2018',
    department: 'Marketing',
    street: '8026 Dare Freeway',
    city: 'Pine Hills',
    state: 'Oregon',
    zipCode: '95407',
  },
  {
    id: '015c67b6-a4e9-475b-8c22-61dfa3fdafbf',
    firstName: 'Lila',
    lastName: 'Casper',
    dateOfBirth: '04/09/1986',
    startDate: '03/10/2015',
    department: 'Sales',
    street: '84837 Hettinger Lights',
    city: 'Nashville-Davidson',
    state: 'Indiana',
    zipCode: '51355',
  },
  {
    id: '41896b3b-7a15-4f56-b0a9-5467d9c6d09e',
    firstName: 'Kevin',
    lastName: 'Zemlak',
    dateOfBirth: '11/26/1970',
    startDate: '04/05/2016',
    department: 'Marketing',
    street: '600 Jerel Crossing',
    city: 'Sanford',
    state: 'Indiana',
    zipCode: '19071',
  },
];