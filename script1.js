// Mock fetch for simulation
const mockFetch = (url, options) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes("authenticate")) {
          resolve({
            json: () =>
              Promise.resolve({
                success: options.body.username === "admin" && options.body.password === "password",
              }),
          });
        } else if (url.includes("firmware")) {
          resolve({ json: () => Promise.resolve({ version: "1.0.1" }) });
        }
      }, 1000);
    });
  };
  
  // Device Constructor
  function Device(name, type, status = "off") {
    this.name = name;
    this.type = type;
    this.status = status;
  }
  
  // Device Prototype Methods
  Device.prototype.turnOn = function () {
    this.status = "on";
    console.log(`${this.name} is turned on.`);
  };
  
  Device.prototype.turnOff = function () {
    this.status = "off";
    console.log(`${this.name} is turned off.`);
  };
  
  Device.prototype.checkStatus = function () {
    console.log(`${this.name} is currently ${this.status}.`);
  };
  
  // SmartDevice Constructor (inherits from Device)
  function SmartDevice(name, type, brand, connectivity = "online") {
    Device.call(this, name, type);
    this.brand = brand;
    this.connectivity = connectivity;
  }
  
  // Inherit Device Prototype
  SmartDevice.prototype = Object.create(Device.prototype);
  SmartDevice.prototype.constructor = SmartDevice;
  
  // SmartDevice Methods
  SmartDevice.prototype.updateFirmware = async function () {
    console.log(`Updating firmware for ${this.name}...`);
    const response = await mockFetch("https://api.smartdevice.com/firmware");
    const data = await response.json();
    console.log(`${this.name} firmware updated to version ${data.version}.`);
  };
  
  SmartDevice.prototype.checkConnectivity = function () {
    console.log(`${this.name} is currently ${this.connectivity}.`);
  };
  
  // SmartLight Constructor (inherits from SmartDevice)
  function SmartLight(name, brand, brightness = 50, color = "white") {
    SmartDevice.call(this, name, "Light", brand);
    this.brightness = brightness;
    this.color = color;
  }
  
  // Inherit SmartDevice Prototype
  SmartLight.prototype = Object.create(SmartDevice.prototype);
  SmartLight.prototype.constructor = SmartLight;
  
  // SmartLight Methods
  SmartLight.prototype.adjustBrightness = function (level) {
    this.brightness = level;
    console.log(`${this.name} brightness adjusted to ${this.brightness}.`);
  };
  
  SmartLight.prototype.changeColor = function (newColor) {
    this.color = newColor;
    console.log(`${this.name} color changed to ${this.color}.`);
  };
  
  // SmartThermostat Constructor (inherits from SmartDevice)
  function SmartThermostat(name, brand, temperature = 22, mode = "cool") {
    SmartDevice.call(this, name, "Thermostat", brand);
    this.temperature = temperature;
    this.mode = mode;
  }
  
  // Inherit SmartDevice Prototype
  SmartThermostat.prototype = Object.create(SmartDevice.prototype);
  SmartThermostat.prototype.constructor = SmartThermostat;
  
  // SmartThermostat Methods
  SmartThermostat.prototype.setTemperature = function (temp) {
    this.temperature = temp;
    console.log(`${this.name} temperature set to ${this.temperature}°C.`);
  };
  
  SmartThermostat.prototype.changeMode = function (newMode) {
    this.mode = newMode;
    console.log(`${this.name} mode changed to ${this.mode}.`);
  };
  
  // SmartHome Constructor
  function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
  }
  
  // SmartHome Methods
  SmartHome.prototype.addDevice = function (device) {
    this.devices.push(device);
    console.log(`${device.name} added to ${this.owner}'s smart home.`);
  };
  
  SmartHome.prototype.removeDevice = function (deviceName) {
    this.devices = this.devices.filter((device) => device.name !== deviceName);
    console.log(`${deviceName} removed from ${this.owner}'s smart home.`);
  };
  
  SmartHome.prototype.listDevices = function () {
    console.log(`${this.owner}'s devices:`);
    this.devices.forEach((device) => console.log(`- ${device.name} (${device.type})`));
  };
  
  // User Constructor
  function User(username, password) {
    this.username = username;
    this.password = password;
    this.smartHome = new SmartHome(username);
  }
  
  // User Methods
  User.prototype.authenticate = async function () {
    console.log("Authenticating user...");
    const response = await mockFetch("https://api.smartuser.com/authenticate", {
      body: { username: this.username, password: this.password },
    });
    const data = await response.json();
    if (data.success) {
      console.log("Authentication successful!");
    } else {
      console.log("Authentication failed!");
    }
  };
  
  // Demonstration
  (async () => {
    // Create users
    const user1 = new User("admin", "password");
    const user2 = new User("guest", "12345");
  
    // Authenticate users
    await user1.authenticate(); // Success
    await user2.authenticate(); // Failure
  
    // Create devices
    const light = new SmartLight("Living Room Light", "Philips");
    const thermostat = new SmartThermostat("Main Thermostat", "Nest");
  
    // Add devices to user's smart home
    user1.smartHome.addDevice(light);
    user1.smartHome.addDevice(thermostat);
  
    // List devices
    user1.smartHome.listDevices();
  
    // Interact with devices
    light.turnOn();
    light.adjustBrightness(75);
    light.changeColor("blue");
  
    thermostat.turnOn();
    thermostat.setTemperature(25);
    thermostat.changeMode("heat");
  
    // Firmware update
    await thermostat.updateFirmware();
  
    // Connectivity check
    light.checkConnectivity();
  
    // Remove a device
    user1.smartHome.removeDevice("Living Room Light");
    user1.smartHome.listDevices();
  })();
  