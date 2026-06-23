// Shared Client-Side Database for Loan Origination & Credit Processing System
// Handles mocked database queries using localStorage

(function () {
  const defaultProducts = [
    {
      id: "PROD-HOME-01",
      name: "Apex Home Mortgage",
      classification: "Retail - Secured",
      rateMin: 3.8,
      rateMax: 5.5,
      amountMin: 100000,
      amountMax: 1500000,
      tenureMin: 120,
      tenureMax: 360,
      minScore: 650,
      status: "Active",
      description: "Adjustable/Fixed options for residential home purchasing."
    },
    {
      id: "PROD-AUTO-01",
      name: "Apex Auto Finance",
      classification: "Retail - Secured",
      rateMin: 4.5,
      rateMax: 7.5,
      amountMin: 10000,
      amountMax: 100000,
      tenureMin: 24,
      tenureMax: 84,
      minScore: 600,
      status: "Active",
      description: "Fixed interest rate auto financing options."
    },
    {
      id: "PROD-PERS-01",
      name: "Apex Personal Loan",
      classification: "Retail - Unsecured",
      rateMin: 10.5,
      rateMax: 15.0,
      amountMin: 5000,
      amountMax: 50000,
      tenureMin: 12,
      tenureMax: 60,
      minScore: 680,
      status: "Active",
      description: "Risk-based pricing unsecured personal cash loans."
    },
    {
      id: "PROD-BUSN-01",
      name: "Business Growth Financing",
      classification: "Commercial - Unsecured",
      rateMin: 6.0,
      rateMax: 9.5,
      amountMin: 50000,
      amountMax: 500000,
      tenureMin: 36,
      tenureMax: 120,
      minScore: 700,
      status: "Active",
      description: "Floating rate expansion loans for small & medium businesses."
    },
    {
      id: "PROD-BRID-02",
      name: "Apex Bridge Financing",
      classification: "Commercial - Temporary",
      rateMin: 12.0,
      rateMax: 14.5,
      amountMin: 25000,
      amountMax: 250000,
      tenureMin: 6,
      tenureMax: 24,
      minScore: 670,
      status: "Inactive",
      description: "Interest-only short term bridge loans."
    }
  ];

  const defaultCustomers = [
    {
      id: "CUST-1049",
      name: "Eleanor Vance",
      email: "eleanor.v@email.com",
      phone: "+1 (555) 019-2834",
      dob: "1989-12-12",
      employment: "Salaried",
      income: 8500,
      kycStatus: "Verified",
      registeredDate: "2026-06-20",
      score: 785
    },
    {
      id: "CUST-1048",
      name: "Devon Lane",
      email: "devon.lane@email.com",
      phone: "+1 (555) 014-9821",
      dob: "1994-07-24",
      employment: "Self-Employed",
      income: 12000,
      kycStatus: "Verified",
      registeredDate: "2026-06-19",
      score: 640
    },
    {
      id: "CUST-1047",
      name: "Bessie Cooper",
      email: "bessie.c@email.com",
      phone: "+1 (555) 015-3948",
      dob: "1982-03-05",
      employment: "Business Owner",
      income: 22500,
      kycStatus: "Pending Docs",
      registeredDate: "2026-06-18",
      score: 710
    },
    {
      id: "CUST-1046",
      name: "Albert Flores",
      email: "albert.f@email.com",
      phone: "+1 (555) 018-4720",
      dob: "1991-09-18",
      employment: "Salaried",
      income: 6200,
      kycStatus: "Verified",
      registeredDate: "2026-06-15",
      score: 785
    },
    {
      id: "CUST-1045",
      name: "Savannah Nguyen",
      email: "savannah.n@email.com",
      phone: "+1 (555) 011-2094",
      dob: "1987-01-30",
      employment: "Unemployed",
      income: 0,
      kycStatus: "Incomplete",
      registeredDate: "2026-06-12",
      score: 510
    },
    {
      id: "CUST-1044",
      name: "Cody Fisher",
      email: "cody.f@email.com",
      phone: "+1 (555) 012-3456",
      dob: "1990-05-15",
      employment: "Salaried",
      income: 5000,
      kycStatus: "Verified",
      registeredDate: "2026-06-11",
      score: 690
    }
  ];

  const defaultApplications = [
    {
      id: "APP-9043",
      customerId: "CUST-1049",
      productId: "PROD-HOME-01",
      amount: 350000,
      tenure: 360,
      status: "UNDER_REVIEW",
      analyst: "Sarah Connor",
      date: "Jun 20, 2026",
      remarks: "FICO score pulled successfully. Income verified."
    },
    {
      id: "APP-9039",
      customerId: "CUST-1048",
      productId: "PROD-AUTO-01",
      amount: 45000,
      tenure: 48,
      status: "APPROVED",
      analyst: "Sarah Connor",
      date: "Jun 19, 2026",
      remarks: "DTI in normal bounds. Auto valuation verified."
    },
    {
      id: "APP-9035",
      customerId: "CUST-1044",
      productId: "PROD-PERS-01",
      amount: 15000,
      tenure: 24,
      status: "NEW",
      analyst: "— (Unassigned)",
      date: "Jun 18, 2026",
      remarks: "New submission. Need payslip auditing."
    },
    {
      id: "APP-9031",
      customerId: "CUST-1045",
      productId: "PROD-PERS-01",
      amount: 8000,
      tenure: 12,
      status: "REJECTED",
      analyst: "James Cole",
      date: "Jun 17, 2026",
      remarks: "High risk profile. Applicant is stated as unemployed."
    },
    {
      id: "APP-9028",
      customerId: "CUST-1047",
      productId: "PROD-BUSN-01",
      amount: 120000,
      tenure: 60,
      status: "UNDER_REVIEW",
      analyst: "James Cole",
      date: "Jun 16, 2026",
      remarks: "Corporate accounts under review."
    }
  ];

  // Helper local storage wrappers
  const getStorage = (key, defaults) => {
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(val);
  };

  const setStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  // API definitions
  window.db = {
    getProducts: () => getStorage("apex_products", defaultProducts),
    getProduct: (id) => window.db.getProducts().find(p => p.id === id),
    addProduct: (product) => {
      const products = window.db.getProducts();
      products.push(product);
      setStorage("apex_products", products);
    },

    getCustomers: () => getStorage("apex_customers", defaultCustomers),
    getCustomer: (id) => window.db.getCustomers().find(c => c.id === id),
    addCustomer: (customer) => {
      const customers = window.db.getCustomers();
      customers.push(customer);
      setStorage("apex_customers", customers);
    },

    getApplications: () => getStorage("apex_applications", defaultApplications),
    getApplication: (id) => window.db.getApplications().find(a => a.id === id),
    addApplication: (app) => {
      const apps = window.db.getApplications();
      apps.push(app);
      setStorage("apex_applications", apps);
    },
    updateApplicationStatus: (id, status, remarks) => {
      const apps = window.db.getApplications();
      const app = apps.find(a => a.id === id);
      if (app) {
        app.status = status;
        if (remarks) {
          app.remarks = remarks;
        }
        setStorage("apex_applications", apps);
      }
    },

    getCurrentUser: () => {
      const u = localStorage.getItem("apex_current_user");
      return u ? JSON.parse(u) : null;
    },
    setCurrentUser: (user) => {
      localStorage.setItem("apex_current_user", JSON.stringify(user));
    },
    logout: () => {
      localStorage.removeItem("apex_current_user");
    }
  };

  // Run initialization
  window.db.getProducts();
  window.db.getCustomers();
  window.db.getApplications();
})();
