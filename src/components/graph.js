import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; 
import Navbar from './Navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,    // Register LineElement for Line chart
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Reports() {
  const [dealsData, setDealsData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [chartType, setChartType] = useState('bar');  // Default chart type is bar

  // UseEffect to store and maintain the selected date range and chart type
  useEffect(() => {
    // Optionally, you can fetch data here or reset chart when component mounts
    if (fromDate && toDate) {
      fetchDeals();
    }
  }, [fromDate, toDate, chartType]);  // This runs when fromDate, toDate, or chartType changes

  const fetchDeals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getdeals");
      const deals = response.data.results;
     
      // Filter by date range
      const filteredDeals = deals.filter((deal) => {
        const closedDate = new Date(deal.properties.closedate);
        const isCloseWon = deal.properties.dealstage;
        const from = new Date(fromDate);
        const to = new Date(toDate);

        // Normalize times
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        if (isCloseWon === 'closedwon') {
          return closedDate >= from && closedDate <= to;
        }
      });
    
      setDealsData(filteredDeals);
      prepareChartData(filteredDeals);
    
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const prepareChartData = (deals) => {
    // Create an object to accumulate the total amount for each date
    const dateAmounts = {};
  
    deals.forEach((deal) => {
      const closedDate = new Date(deal.properties.closedate).toLocaleDateString();
  
      // Accumulate the amounts for the same date
      if (dateAmounts[closedDate]) {
        dateAmounts[closedDate] += parseFloat(deal.properties.amount || 0);
      } else {
        dateAmounts[closedDate] = parseFloat(deal.properties.amount || 0);
      }
    });
  
    // Prepare the labels (dates) and data (sum of amounts for each date)
    const labels = Object.keys(dateAmounts);
  
    // Sort the dates in ascending order
    labels.sort((a, b) => new Date(a) - new Date(b));
  
    // Map amounts based on sorted labels
    const amounts = labels.map((label) => dateAmounts[label]);
  
    const preparedData = {
      labels,
      datasets: [
        {
          label: 'Total Deal Amount',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    setChartData(preparedData);
  };

  // Handle the chart type change from the dropdown
  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div style={{ width: '60%', margin: '0 auto', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
        <h1>Sales Reports</h1>

        {/* Date input section */}
        <div style={{ marginBottom: '10px' }}>
          <label>From: </label>
          <input 
            type="date" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)} 
            style={{ marginRight: '10px' }} 
          />
          <label>To: </label>
          <input 
            type="date" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)} 
            style={{ marginRight: '10px' }} 
          />
          <button onClick={fetchDeals} style={{ padding: '5px 10px', marginLeft: '10px' }}>Show</button>
        </div>

        {/* Chart type selection */}
        <div style={{ marginBottom: '20px' }}>
          <select 
            value={chartType} 
            onChange={handleChartTypeChange} 
            style={{ padding: '5px', fontSize: '16px' }}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>

        {/* Display the selected chart */}
        {chartData.labels && chartData.labels.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {chartType === 'bar' && <Bar data={chartData} />}
            {chartType === 'line' && <Line data={chartData} />}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No data to display. Select a date range and fetch data.</p>
        )}
      </div>
    </>
  );
}

export default Reports;
