const covid19ImpactEstimator = (data) => {
  
  
  const {region, periodType, timeToElapse, reportedCases, population, totalHospitalBeds} = data;
  
  const {name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation} = region;
  
  const impactCurrentlyInfected = reportedCases * 10;
  const severeCurrentlyInfected = reportedCases * 50;
  
  let daysNo;
  
  if (periodType === 'months') {
      daysNo = timeToElapse * 30;
  }else if (periodType === 'weeks') {
      daysNo = timeToElapse * 7;
  }else if (periodType === 'days') {
      daysNo = timeToElapse;
  }
  
  
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (Math.pow(2, Math.truc(daysNo / 3)));
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * (Math.pow(2, Math.truc(daysNo / 3)));
  
  const impactCasesByRequestedTime = (15 / 100) * impactInfectionsByRequestedTime;
  const severeCasesByRequestedTime = (15 / 100) * severeInfectionsByRequestedTime;
  
  const availableHospitalBed = Math.trunc((35 / 100 ) * totalHospitalBeds);
  const impactHospitalBedsByRequestedTime = availableHospitalBed - impactCasesByRequestedTime;
  const severeHospitalBedsByRequestedTime = availableHospitalBed - severeCasesByRequestedTime;
  
  const impactCasesForICUByRequestedTime = (5 / 100) * impactInfectionsByRequestedTime;
  const severeCasesForICUByRequestedTime = (5 / 100) * severeInfectionsByRequestedTime;
  
  const impactCasesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * impactInfectionsByRequestedTime);
  const severeCasesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * severeInfectionsByRequestedTime);
  
  const impactDollarsInFlight = Math.trunc((
                                      impactInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / daysNo);
  
  const severeDollarsInFlight = Math.trunc((
                                      severeInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / daysNo);								
  
  
  return {
      data,
      impact: {
          currentlyInfected: impactCurrentlyInfected,
          infectionsByRequestedTime: impactInfectionsByRequestedTime,
          severeCasesByRequestedTime: impactCasesByRequestedTime,
          hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
          casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
          casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
          dollarsInFlight: impactDollarsInFlight
      },
      severeImpact: {
          currentlyInfected: severeCurrentlyInfected,
          infectionsByRequestedTime: severeInfectionsByRequestedTime,
          severeCasesByRequestedTime: severeCasesByRequestedTime,
          hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
          casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
          casesForVentilatorsByRequestedTime: severeCasesForVentilatorsByRequestedTime,
          dollarsInFlight: severeDollarsInFlight
      }
  };
};


export default covid19ImpactEstimator;
