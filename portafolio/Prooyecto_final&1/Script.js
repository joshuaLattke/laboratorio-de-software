  // Gestión de pestañas
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          const tabId = button.dataset.tab;
          
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          button.classList.add('active');
          document.getElementById(tabId).classList.add('active');
      });
  });

  // Gestor de Presupuesto
  let budgetChart = null;
  const budgetForm = document.getElementById('budget-form');
  const budgetCtx = document.getElementById('budget-chart').getContext('2d');

  budgetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const income = parseFloat(document.getElementById('income').value);
      const expenses = Array.from(document.querySelectorAll('input[name="expense"]'))
          .map(input => parseFloat(input.value) || 0);
      const unexpected = parseFloat(document.getElementById('unexpected').value) || 0;

      const categories = ['Vivienda', 'Alimentación', 'Transporte', 'Servicios', 'Entretenimiento'];
      const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0) + unexpected;
      const savings = income - totalExpenses;

      if (budgetChart) {
          budgetChart.destroy();
      }

      budgetChart = new Chart(budgetCtx, {
          type: 'doughnut',
          data: {
              labels: [...categories, 'Gastos Inesperados', 'Ahorro'],
              datasets: [{
                  data: [...expenses, unexpected, savings],
                  backgroundColor: [
                      '#4299e1',
                      '#48bb78',
                      '#ed8936',
                      '#667eea',
                      '#ed64a6',
                      '#cbd5e0',
                      '#2563eb'
                  ]
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false
          }
      });
  });

  // Simulador de Ahorro
  let savingsChart = null;
  const savingsForm = document.getElementById('savings-form');
  const savingsCtx = document.getElementById('savings-chart').getContext('2d');

  savingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const goalAmount = parseFloat(document.getElementById('goal-amount').value);
      const monthlySaving = parseFloat(document.getElementById('monthly-saving').value);
      const increase = parseFloat(document.getElementById('progressive-increase').value) || 0;
      const targetDate = new Date(document.getElementById('target-date').value);
      
      const months = Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24 * 30.44));
      const data = [];
      let currentSavings = 0;
      let currentContribution = monthlySaving;

      for (let i = 0; i <= months; i++) {
          currentSavings += currentContribution;
          data.push(currentSavings);
          currentContribution *= (1 + (increase / 100));
      }

      if (savingsChart) {
          savingsChart.destroy();
      }

      savingsChart = new Chart(savingsCtx, {
          type: 'line',
          data: {
              labels: Array.from({length: months + 1}, (_, i) => `Mes ${i}`),
              datasets: [{
                  label: 'Proyección de Ahorro',
                  data: data,
                  borderColor: '#2563eb',
                  tension: 0.1
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  y: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Ahorros ($)'
                      }
                  },
                  x: {
                      title: {
                          display: true,
                          text: 'Meses'
                      }
                  }
              }
          }
      });
  });