document.getElementById('investment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var days = parseInt(document.getElementById('days').value);
    var amount = parseFloat(document.getElementById('amount').value);
    
    if (days <= 0 || days > 750) {
      alert("Por favor, ingrese un número de días válido (1-600).");
      return;
    }
    
    var totalAmount = amount;
    var investmentData = [];
    
    for (var i = 1; i <= days; i++) {
      var dailyInterest = totalAmount * 0.30 / 365;
      totalAmount += dailyInterest;
      investmentData.push({ day: i, amount: totalAmount });
    }
    
    var tableBody = document.getElementById('investment-body');
    tableBody.innerHTML = '';
    var total = 0;
    investmentData.forEach(function(data) {
      var row = document.createElement('tr');
      var dayCell = document.createElement('td');
      dayCell.textContent = data.day;
      var amountCell = document.createElement('td');
      amountCell.textContent = '$' + data.amount.toFixed(2);
      row.appendChild(dayCell);
      row.appendChild(amountCell);
      tableBody.appendChild(row);
      total += data.amount;
    });
  
    var totalDiv = document.getElementById('total');
    totalDiv.innerHTML = "<p>Total acumulado: $" + total.toFixed(2) + "</p>";
  });
  