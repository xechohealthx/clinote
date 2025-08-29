import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Info,
  CheckCircle,
  Star
} from 'lucide-react';

const ROICalculator = () => {
  const [selectedScenario, setSelectedScenario] = useState('medium');

  // Predefined scenarios with guaranteed valid data
  const scenarios = {
    small: {
      name: "Small Practice",
      patientsPerDay: 15,
      chartingTimePerPatient: 12,
      hourlyRate: 120,
      description: "1-2 providers, 15 patients/day"
    },
    medium: {
      name: "Medium Practice", 
      patientsPerDay: 25,
      chartingTimePerPatient: 15,
      hourlyRate: 150,
      description: "3-5 providers, 25 patients/day"
    },
    large: {
      name: "Large Practice",
      patientsPerDay: 40,
      chartingTimePerPatient: 18,
      hourlyRate: 180,
      description: "6+ providers, 40 patients/day"
    }
  };

  // Static calculation function with guaranteed results
  const calculateROI = (scenario: any) => {
    const { patientsPerDay, chartingTimePerPatient, hourlyRate } = scenario;
    
    // More realistic national averages
    const timeReduction = 0.60; // 60% time reduction (increased from 50%)
    const patientIncrease = 0.15; // 15% more patients (more conservative)
    const billingImprovement = 0.02; // 2% reduction in denials (more realistic)
    const avgRevenuePerPatient = 100; // $100 per patient (more conservative)
    const avgBillingDenialRate = 0.05; // 5% denial rate (more realistic)
    
    // Daily calculations
    const currentChartingHours = (patientsPerDay * chartingTimePerPatient) / 60;
    const newChartingHours = currentChartingHours * (1 - timeReduction);
    const timeSavedPerDay = currentChartingHours - newChartingHours;
    
    // Annual calculations (assuming 5 days/week, 48 weeks/year)
    const workingDaysPerYear = 5 * 48;
    const timeSavedPerYear = timeSavedPerDay * workingDaysPerYear;
    const timeSavingsValue = timeSavedPerYear * hourlyRate;
    
    // Revenue calculations (more conservative)
    const additionalPatientsPerDay = patientsPerDay * patientIncrease;
    const additionalRevenuePerYear = additionalPatientsPerDay * avgRevenuePerPatient * workingDaysPerYear;
    
    // Billing improvements
    const currentRevenue = patientsPerDay * avgRevenuePerPatient * workingDaysPerYear;
    const billingSavings = currentRevenue * avgBillingDenialRate * billingImprovement;
    
    // Total savings
    const totalSavings = timeSavingsValue + additionalRevenuePerYear + billingSavings;
    const annualCost = 29.99 * 12;
    const roi = ((totalSavings - annualCost) / annualCost) * 100;
    
    return {
      timeSavedPerDay: timeSavedPerDay.toFixed(1),
      timeSavedPerYear: timeSavedPerYear.toFixed(0),
      timeSavingsValue: Math.round(timeSavingsValue),
      additionalPatientsPerDay: additionalPatientsPerDay.toFixed(1),
      additionalRevenuePerYear: Math.round(additionalRevenuePerYear),
      billingSavings: Math.round(billingSavings),
      totalSavings: Math.round(totalSavings),
      roi: Math.round(roi)
    };
  };

  const currentScenario = scenarios[selectedScenario as keyof typeof scenarios];
  const results = calculateROI(currentScenario);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <Calculator className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI Calculator</h1>
          <p className="text-lg text-gray-600">See your potential savings with Clinote based on practice size</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Practice Size Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Practice Size</h2>
            
            <div className="space-y-4">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <div
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedScenario === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{scenario.name}</h3>
                      <p className="text-gray-600 text-sm">{scenario.description}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {scenario.patientsPerDay} patients/day • {scenario.chartingTimePerPatient} min charting • ${scenario.hourlyRate}/hr
                      </div>
                    </div>
                    {selectedScenario === key && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* National Averages Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Based on National Averages
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 60% reduction in charting time with AI</li>
                <li>• 15% increase in patient capacity</li>
                <li>• 2% reduction in billing denials</li>
                <li>• $100 average revenue per patient visit</li>
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your ROI Analysis</h2>
            
            <div className="space-y-6">
              {/* Time Savings */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Time Savings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Time saved per day</p>
                    <p className="text-xl font-bold text-emerald-600">{results.timeSavedPerDay} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time saved per year</p>
                    <p className="text-xl font-bold text-emerald-600">{results.timeSavedPerYear} hours</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
                  <p className="text-emerald-800 font-semibold">
                    Value of time savings: ${results.timeSavingsValue.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Revenue Impact */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
                  Revenue Impact
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Additional patients per day</span>
                    <span className="font-bold text-emerald-600">+{results.additionalPatientsPerDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Additional annual revenue</span>
                    <span className="font-bold text-emerald-600">${results.additionalRevenuePerYear.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Billing improvement savings</span>
                    <span className="font-bold text-emerald-600">${results.billingSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Total ROI */}
              <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Total Annual Impact
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Time savings value</span>
                    <span className="font-bold">${results.timeSavingsValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Additional revenue</span>
                    <span className="font-bold">${(results.additionalRevenuePerYear + results.billingSavings).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center text-lg">
                      <span>Total annual savings</span>
                      <span className="font-bold text-xl">${results.totalSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Percentage */}
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {results.roi.toLocaleString()}% ROI
                </h3>
                <p className="text-gray-600">
                  Return on your $360 annual investment
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  No credit card required • 7-day free trial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Benefits Not Included in ROI</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Improved Patient Care</h3>
              <p className="text-gray-600 text-sm">
                More time for patient interaction and less time on documentation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Documentation</h3>
              <p className="text-gray-600 text-sm">
                More accurate and complete medical records with AI assistance
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reduced Burnout</h3>
              <p className="text-gray-600 text-sm">
                Less administrative burden leads to higher job satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
