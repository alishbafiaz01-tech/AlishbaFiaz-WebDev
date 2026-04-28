// ====================== SAMPLE DATA ======================

let drivers = [
  {
    driverId: 1,
    name: "Ali",
    rides: [
      { distance: 10, fare: 500, rating: 4.8, completed: true },
      { distance: 5, fare: 200, rating: 4.2, completed: false },
      { distance: 8, fare: 300, rating: 4.9, completed: true },
      { distance: 6, fare: 250, rating: 4.7, completed: true },
      { distance: 7, fare: 350, rating: 4.6, completed: true },
      { distance: 9, fare: 400, rating: 4.8, completed: true }
    ]
  },
  {
    driverId: 2,
    name: "Sara",
    rides: [
      { distance: 3, fare: 100, rating: 3.5, completed: false },
      { distance: 4, fare: 150, rating: 3.8, completed: false }
    ]
  }
];

let projects = [
  {
    projectName: "App",
    budget: 10000,
    employees: [
      {
        empId: 1,
        name: "Ahmed",
        tasks: [
          { taskName: "UI", hoursWorked: 5, status: "completed" },
          { taskName: "API", hoursWorked: 3, status: "pending" }
        ]
      }
    ]
  },
  {
    projectName: "Website",
    budget: 8000,
    employees: [
      {
        empId: 1,
        name: "Ahmed",
        tasks: [
          { taskName: "Frontend", hoursWorked: 6, status: "completed" }
        ]
      },
      {
        empId: 2,
        name: "Ali",
        tasks: [
          { taskName: "Backend", hoursWorked: 0, status: "pending" }
        ]
      }
    ]
  }
];

// ====================== DRIVER ANALYSIS ======================

function runDriverAnalysis() {
  let result = {};

  // Total earnings
  result.totalEarnings = drivers.map(driver => {
    let total = driver.rides
      .filter(r => r.completed)
      .reduce((sum, r) => sum + r.fare, 0);

    return { name: driver.name, total };
  });

  // Average rating
  result.avgRatings = drivers.map(driver => {
    let completed = driver.rides.filter(r => r.completed);
    let avg =
      completed.reduce((sum, r) => sum + r.rating, 0) /
      (completed.length || 1);

    return { name: driver.name, avg };
  });

  // Top driver
  result.topDriver = result.totalEarnings.reduce((max, d) =>
    d.total > max.total ? d : max
  );

  // Best drivers
  result.bestDrivers = drivers.filter(driver => {
    let completed = driver.rides.filter(r => r.completed);
    let avg =
      completed.reduce((sum, r) => sum + r.rating, 0) /
      (completed.length || 1);

    return completed.length >= 5 && avg > 4.5;
  });

  // Inactive drivers
  result.inactiveDrivers = drivers
    .filter(d => d.rides.every(r => !r.completed))
    .map(d => d.name);

  display(result);
}

// ====================== PROJECT ANALYSIS ======================

function runProjectAnalysis() {
  let result = {};

  // Total hours per employee
  result.employeeHours = [];

  projects.forEach(project => {
    project.employees.forEach(emp => {
      let total = emp.tasks
        .filter(t => t.status === "completed")
        .reduce((sum, t) => sum + t.hoursWorked, 0);

      result.employeeHours.push({ name: emp.name, total });
    });
  });

  // Project cost
  result.projectCost = projects.map(project => {
    let totalHours = 0;

    project.employees.forEach(emp => {
      totalHours += emp.tasks
        .filter(t => t.status === "completed")
        .reduce((sum, t) => sum + t.hoursWorked, 0);
    });

    return {
      project: project.projectName,
      cost: totalHours * 10
    };
  });

  // Hardworking employee
  let max = { name: "", hours: 0 };

  result.employeeHours.forEach(emp => {
    if (emp.total > max.hours) {
      max = { name: emp.name, hours: emp.total };
    }
  });

  result.hardworking = max;

  // Projects with incomplete employees
  result.incompleteProjects = projects.filter(project =>
    project.employees.some(emp =>
      emp.tasks.every(t => t.status !== "completed")
    )
  );

  // Multi-project employees
  let map = {};

  projects.forEach(project => {
    project.employees.forEach(emp => {
      if (!map[emp.empId]) {
        map[emp.empId] = { name: emp.name, count: 0 };
      }
      map[emp.empId].count++;
    });
  });

  result.multiProjectEmployees = Object.values(map)
    .filter(e => e.count > 1)
    .map(e => e.name);

  display(result);
}

// ====================== DISPLAY ======================

function display(data) {
  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
}