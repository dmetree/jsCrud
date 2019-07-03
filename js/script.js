
var app = new function() {
  this.el = document.getElementById('names');
  this.names = [
      { name:'Rosa', phone: 89201234567},
      { name:'Terry', phone: 89262345678},
      { name:'Ron', phone: 89093456789 },
      { name:'Susan', phone: 89014567890 }
    ];
  
  this.Count = function(data) {
    var el   = document.getElementById('counter');
    var name = 'name';
    if (data) {
      if (data > 1) {
        name = 'names';
      }
      el.innerHTML = data + ' ' + name ;
    } else {
      el.innerHTML = 'No ' + name;
    }
  };
  
  this.FetchAll = function() {
    var data = '';
    if (this.names.length > 0) {
      for (i = 0; i < this.names.length; i++) {
        data += '<tr>';
        data += '<td>' + this.names[i].name + '</td>';
        data += '<td>' + this.names[i].phone + '</td>';
        data += '<td><button onclick="app.Edit(' + i + ')">Edit</button></td>';
        data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
        data += '</tr>';
      }
    }
    this.Count(this.names.length);
    return this.el.innerHTML = data;
  };
  
  this.Add = function () {
    el = document.getElementById('add-name');
    elN = document.getElementById('add-number');
    var error = document.getElementById('error');
    el_De = el.value;
    elN_De = elN.value;
    if (el_De && elN_De) {
      this.names.push({ name: el_De.trim(), phone: elN_De});
    
      el.value = '';
      elN.value = '';

      error.style.display = 'none';

    this.FetchAll();
      
    } else {
        var error = document.getElementById('error');
        error.innerHTML = "Заполните все поля";
        // alert('');
    }
  };
  
  this.Edit = function (item) {
    var el = document.getElementById('edit-name'); 
    var elN = document.getElementById('edit-number');
    el.value = this.names[item].name; 
    elN.value = this.names[item].phone; 
    document.getElementById('spoiler').style.display = 'block';
    self = this;
    document.getElementById('saveEdit').onsubmit = function() { // Get value
      var name = el.value;
      var phone = elN.value;
      if (name && phone) {  
        self.names.splice(item, 1, {name: el.value.trim(), phone: elN.value}); // Edit value
        self.FetchAll(); 
        CloseInput(); 
      } else{
        var error = document.getElementById('error');
        error.innerHTML = "Заполните все поля";
      }
    }
  };
  
  this.Delete = function (item) {
    this.names.splice(item, 1);
    this.FetchAll();
  };
}

app.FetchAll();

function CloseInput() {
  document.getElementById('spoiler').style.display = 'none';
}
