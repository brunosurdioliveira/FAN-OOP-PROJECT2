// Array of new video devices
var aVideoDevices = [];
var aHardDisk = [];
var aSSD = [];
var outputVideoDevice = gel("videoDeviceProperties");
var outputHardDisk = gel("hardDiskProperties");
var outputSSD = gel("ssdProperties");
// Create variable to identify current index (selected object in the array)
var initialIndex = 0;
var currentIndex = 0;
var currentIndexHD = 0;
var currentIndexSSD = 0;

// Create the base class Device
class Device {
    // define the constructor function for Device
    constructor(repCost, supName, serialNumb, stats) {
        this._replacementCost = repCost; // Number - currency
        this._supplierName = supName; // String
        this._serialNumber = serialNumb; // String
        this._status = stats;
    }

    // Methods
    // If it is enabled set _status to true
    enable() {
        this._status = true;
    }

    // If it is disabled set _status to false
    disable() {
        this._status = false;
    }

    // Get status => if _status = true return enabled
    get status() {
        if (this._status == true) {
            return "Enabled";
        }
        else { // _status = false return disabled
            return "Disabled";
        }
    }
}

// Derived class Device
class VideoDevice extends Device {
    constructor(repCost, supName, serialNumb, stats, resolution, type) {
        // Include a reference to the base "Device" class with "super"
        super(repCost, supName, serialNumb, stats);
        this._resolution = resolution; // String
        this._type = type; // String
    }

}

class DiskDevice extends Device {
    constructor(repCost, supName, serialNumb, stats, size, transRate) {
        // Include a reference to the base "Device" class with "super"
        super(repCost, supName, serialNumb, stats);
        this._size = size; // String
        this._transferRate = transRate; // String
    }
}

// Derived class DiskDevice
class HardDisk extends DiskDevice {
    constructor(repCost, supName, serialNumb, stats, size, transRate, platSize, platNumber) {
        super(repCost, supName, serialNumb, stats, size, transRate);
        this._platterSize = platSize; // String
        this._numberOfPlatters = platNumber // Integer
    }
}

class SSD extends DiskDevice {
    constructor(repCost, supName, serialNumb, stats, size, transRate, type, wearLev) {
        super(repCost, supName, serialNumb, stats, size, transRate);
        this._type = type; // String
        this._wearLeveling = wearLev; // Boolean
    }
}

// VIDEO DEVICE FUNCTIONS
// Create some data to test
aVideoDevices.push(new VideoDevice("1200.00", "Apple", "1AB123AC", false, "3840 x 2164", "LCD"));
aVideoDevices.push(new VideoDevice("104.99", "Samsung", "2VS123AC", true, "1840 x 1064", "Plasma"));

aHardDisk.push(new HardDisk("80.00", "Dell", "11AACC12", false, "4TB", "7GB/second", "2.5 inches", 10));
aHardDisk.push(new HardDisk("99.99", "Seagate", "12345678", true, "5TB", "6GB/second", "5 inches", 8));

aSSD.push(new SSD("300.00", "Dell", "12387650", true, "6TB", "8GB/second", "Flash", true));
aSSD.push(new SSD("214.99", "SATA", "87654321", true, "10", "7GB/second", "DRAM", true));

// Next and Previous
function next(type) {
    if (type === 1) {
        // add 1 each time to current index
        currentIndex = (currentIndex >= aVideoDevices.length - 1) ? currentIndex : (currentIndex + 1);
        // Call function to display the video device information
        displayDevices(type, currentIndex);
    }
    else if (type === 2) {
        // add 1 each time to current index of Hard Disk
        currentIndexHD = (currentIndexHD >= aHardDisk.length - 1) ? currentIndexHD : (currentIndexHD + 1);
        // Call function to display the Hard Disk device information
        displayDevices(type, currentIndexHD);
    }
    else if (type === 3) {
        // add 1 each time to current index of SSD 
        currentIndexSSD = (currentIndexSSD >= aSSD.length - 1) ? currentIndexSSD : (currentIndexSSD + 1);
        // Call function to display the SSD device information
        displayDevices(type, currentIndexSSD);
    }
}

function previous(type) {
    if (type === 1) {
        // remove 1 each time to current index
        currentIndex = (currentIndex <= 0) ? currentIndex : (currentIndex - 1);
        // Call function to display the video device informations
        displayDevices(type, currentIndex);
    }
    else if (type === 2) {
        // remove 1 each time to current index
        currentIndexHD = (currentIndexHD <= 0) ? currentIndexHD : (currentIndexHD - 1);
        // Call function to display the Hard disk informations
        displayDevices(type, currentIndexHD);
    }
    else if (type === 3) {
        // remove 1 each time to current index
        currentIndexSSD = (currentIndexSSD <= 0) ? currentIndexSSD : (currentIndexSSD - 1);
        // Call function to display the SSD device informations
        displayDevices(type, currentIndexSSD);
    }
}

// Open modal to add new VD (1), HD(2), SSD(3)
function addNew(type) {
    if (type === 1) {
        // Show the update button 
        gel("updateButton").hidden = true;
        gel("createNew").hidden = false;

        // Change the modal title
        gel("newDeviceTitle").innerHTML = "New Video Device";

        // Clear all values
        gel("repCost").value = "";
        gel("supName").value = "";
        gel("serialNumb").value = "";
        gel("status").checked = false;
        gel("resolution").value = "";
        gel("typeOfVideoDevice").value = "0";
    }
    else if (type === 2) {
        // Show the update button 
        gel("updateButtonHD").hidden = true;
        gel("createNewHD").hidden = false;

        // Change the modal title
        gel("hardDiskTitle").innerHTML = "New Hard Disk";

        // Clear all values
        gel("repCostHD").value = "";
        gel("supNameHD").value = "";
        gel("serialNumbHD").value = "";
        gel("statusHD").checked = false;
        gel("sizeHD").value = "";
        gel("transfRateHD").value = "";
        gel("platSizeHD").value = "";
        gel("platNumberHD").value = "";
    }
    else if (type === 3) {
        // Show the update button 
        gel("updateButtonSSD").hidden = true;
        gel("createSSD").hidden = false;

        // Change the modal title
        gel("ssdTitle").innerHTML = "New SSD";

        // Clear all values
        gel("repCostSSD").value = "";
        gel("supNameSSD").value = "";
        gel("serialNumbSSD").value = "";
        gel("statusSSD").checked = false;
        gel("sizeSSD").value = "";
        gel("transfRateSSD").value = "";
        gel("typeSSD").value = "0";
        gel("wearLevelingSSD").checked = false;
    }
}

// Open modal to update devices (type 1 - VD, type 2 - HD, type 3 - SSD)
function openUpdate(type, index) {
    if (type === 1) {
        // Show the update button 
        gel("updateButton").hidden = false;
        gel("createNew").hidden = true;

        // Change the modal title
        gel("newDeviceTitle").innerHTML = "Edit Video Device";

        // output all values
        gel("repCost").value = aVideoDevices[index]._replacementCost;
        gel("supName").value = aVideoDevices[index]._supplierName;
        gel("serialNumb").value = aVideoDevices[index]._serialNumber;
        gel("status").checked = aVideoDevices[index]._status;
        gel("resolution").value = aVideoDevices[index]._resolution;
        gel("typeOfVideoDevice").value = aVideoDevices[index]._type;
    }
    else if (type === 2) {
        // Show the update button 
        gel("updateButtonHD").hidden = false;
        gel("createNewHD").hidden = true;

        // Change the modal title
        gel("hardDiskTitle").innerHTML = "Edit Hard Disk";

        // output all values
        gel("repCostHD").value = aHardDisk[index]._replacementCost;
        gel("supNameHD").value = aHardDisk[index]._supplierName;
        gel("serialNumbHD").value = aHardDisk[index]._serialNumber;
        gel("statusHD").checked = aHardDisk[index]._status;
        gel("sizeHD").value = aHardDisk[index]._size;
        gel("transfRateHD").value = aHardDisk[index]._transferRate;
        gel("platSizeHD").value = aHardDisk[index]._platterSize;
        gel("platNumberHD").value = aHardDisk[index]._numberOfPlatters;
    }
    else if (type === 3) {
        // Show the update button 
        gel("updateButtonSSD").hidden = false;
        gel("createSSD").hidden = true;

        // Change the modal title
        gel("ssdTitle").innerHTML = "Edit SSD";

        // output all values
        gel("repCostSSD").value = aSSD[index]._replacementCost;
        gel("supNameSSD").value = aSSD[index]._supplierName;
        gel("serialNumbSSD").value = aSSD[index]._serialNumber;
        gel("statusSSD").checked = aSSD[index]._status;
        gel("sizeSSD").value = aSSD[index]._size;
        gel("transfRateSSD").value = aSSD[index]._transferRate;
        gel("typeSSD").value = aSSD[index]._type;
        gel("wearLevelingSSD").checked = aSSD[index]._wearLeveling;
    }
}

// Function to create Devices (type 1 - VD, type 2 - HD, type 3 - SSD)
function newDevice(type) {
    if (type === 1) {
        // Get the inputed values
        let repCost = gel("repCost").value;
        let supName = gel("supName").value;
        let serialNumb = gel("serialNumb").value;
        let stats = gel("status").checked;
        let resolution = gel("resolution").value;
        let type = gel("typeOfVideoDevice").value;

        // Create a new video Device
        let videoDevice = new VideoDevice(repCost, supName, serialNumb, stats, resolution, type);

        // Enabled or disabled using methods
        if (stats === true) {
            videoDevice.enable();
        }
        else {
            videoDevice.disable();
        }

        // Add the new device to the array
        aVideoDevices.push(videoDevice);

        // Display the new created
        currentIndex = aVideoDevices.length - 1;
        displayDevices(1, currentIndex);
    }
    else if (type === 2) {
        // Get the inputed values
        let repCost = gel("repCostHD").value;
        let supName = gel("supNameHD").value;
        let serialNumb = gel("serialNumbHD").value;
        let stats = gel("statusHD").checked;
        let size = gel("sizeHD").value;
        let transfRate = gel("transfRateHD").value;
        let platSize = gel("platSizeHD").value;
        let numberOfPlat = gel("platNumberHD").value;

        // Create a new hardDisk
        let hardDisk = new HardDisk(repCost, supName, serialNumb, stats, size, transfRate, platSize, numberOfPlat);

        // Enabled or disabled using methods
        if (stats === true) {
            hardDisk.enable();
        }
        else {
            hardDisk.disable();
        }

        // Add the new device to the array
        aHardDisk.push(hardDisk);

        // Display the new created
        currentIndexHD = aHardDisk.length - 1;
        displayDevices(2, currentIndexHD);
    }
    else if (type === 3) {
        // Get the inputed values
        let repCost = gel("repCostSSD").value;
        let supName = gel("supNameSSD").value;
        let serialNumb = gel("serialNumbSSD").value;
        let stats = gel("statusSSD").checked;
        let size = gel("sizeSSD").value;
        let transfRate = gel("transfRateSSD").value;
        let type = gel("typeSSD").value;
        let wearLeveling = gel("wearLevelingSSD").checked;

        // Create a new SSD
        let ssd = new SSD(repCost, supName, serialNumb, stats, size, transfRate, type, wearLeveling);

        // Enabled or disabled using methods
        if (stats === true) {
            ssd.enable();
        }
        else {
            ssd.disable();
        }

        // Add the new SSD to the array
        aSSD.push(ssd);

        // Display the new created
        currentIndexSSD = aSSD.length - 1;
        displayDevices(3, currentIndexSSD);
    }
}

// Function to uptdate devices (type 1 - VD, type 2 - HD, type 3 - SSD)
function updateDevice(type, index) {
    if (type === 1) {
        // Get the inputed values
        let repCost = gel("repCost").value;
        let supName = gel("supName").value;
        let serialNumb = gel("serialNumb").value;
        let resolution = gel("resolution").value;
        let type = gel("typeOfVideoDevice").value;
        let stats = gel("status").checked;

        // Add the new device to the array[index]
        aVideoDevices[index]._replacementCost = repCost;
        aVideoDevices[index]._supplierName = supName;
        aVideoDevices[index]._serialNumber = serialNumb;

        // Assign values to ._status using the methods            
        if (stats === true) {
            aVideoDevices[index].enable()
        }
        else {
            aVideoDevices[index].disable()
        }

        aVideoDevices[index]._resolution = resolution;
        aVideoDevices[index]._type = type;

        // Display the new created
        displayDevices(1, index);
    }
    else if (type === 2) {
        // Get the inputed values
        let repCost = gel("repCostHD").value;
        let supName = gel("supNameHD").value;
        let serialNumb = gel("serialNumbHD").value;
        let stats = gel("statusHD").checked;
        let size = gel("sizeHD").value;
        let transfRate = gel("transfRateHD").value;
        let platSize = gel("platSizeHD").value;
        let numberOfPlat = gel("platNumberHD").value;

        // Add the new device to the array[index]
        aHardDisk[index]._replacementCost = repCost;
        aHardDisk[index]._supplierName = supName;
        aHardDisk[index]._serialNumber = serialNumb;
        aHardDisk[index]._size = size;
        aHardDisk[index]._transferRate = transfRate;
        aHardDisk[index]._platterSize = platSize;
        aHardDisk[index]._numberOfPlatters = numberOfPlat;

        // Assign values to ._status using the methods            
        if (stats === true) {
            aHardDisk[index].enable()
        }
        else {
            aHardDisk[index].disable()
        }

        // Display the new created
        displayDevices(2, index);
    }
    else if (type === 3) {
        // Get the inputed values
        let repCost = gel("repCostSSD").value;
        let supName = gel("supNameSSD").value;
        let serialNumb = gel("serialNumbSSD").value;
        let stats = gel("statusSSD").checked;
        let size = gel("sizeSSD").value;
        let transfRate = gel("transfRateSSD").value;
        let type = gel("typeSSD").value;
        let wearLeveling = gel("wearLevelingSSD").checked;

        // Add the new device to the array[index]
        aSSD[index]._replacementCost = repCost;
        aSSD[index]._supplierName = supName;
        aSSD[index]._serialNumber = serialNumb;
        aSSD[index]._size = size;
        aSSD[index]._transferRate = transfRate;
        aSSD[index]._type = type;
        aSSD[index]._wearLeveling = wearLeveling;

        // Assign values to ._status using the methods            
        if (stats === true) {
            aSSD[index].enable()
        }
        else {
            aSSD[index].disable()
        }

        // Display the new created
        displayDevices(3, index);
    }
}

// Display the devices
function displayDevices(type, index) {
    if (type === 1) {
        // Clear the output area 
        outputVideoDevice.innerHTML = "";
        // Loop through the array
        outputVideoDevice.innerHTML += "Replacement Costs: $" + aVideoDevices[index]._replacementCost + "<br>";
        outputVideoDevice.innerHTML += "Supplier: " + aVideoDevices[index]._supplierName + "<br>";
        outputVideoDevice.innerHTML += "Serial Number: " + aVideoDevices[index]._serialNumber + "<br>";

        // Get the status by getter status()
        outputVideoDevice.innerHTML += "Status: " + aVideoDevices[index].status + "<br>";
        outputVideoDevice.innerHTML += "Resolution: " + aVideoDevices[index]._resolution + "<br>";
        outputVideoDevice.innerHTML += "Type: " + aVideoDevices[index]._type + "<br>";
    }
    else if (type === 2) {
        // Clear the output area 
        outputHardDisk.innerHTML = "";
        // Loop through the array
        outputHardDisk.innerHTML += "Replacement Costs: $" + aHardDisk[index]._replacementCost + "<br>";
        outputHardDisk.innerHTML += "Supplier: " + aHardDisk[index]._supplierName + "<br>";
        outputHardDisk.innerHTML += "Serial Number: " + aHardDisk[index]._serialNumber + "<br>";

        // Get the status by getter status()
        outputHardDisk.innerHTML += "Status: " + aHardDisk[index].status + "<br>";
        outputHardDisk.innerHTML += "Size: " + aHardDisk[index]._size + "<br>";
        outputHardDisk.innerHTML += "Transfer Rate: " + aHardDisk[index]._transferRate + "<br>";
        outputHardDisk.innerHTML += "Platter Size: " + aHardDisk[index]._platterSize + "<br>";
        outputHardDisk.innerHTML += "Number Of Platters: " + aHardDisk[index]._numberOfPlatters + "<br>";
    }
    else if (type === 3) {
        // Clear the output area 
        outputSSD.innerHTML = "";
        // Loop through the array
        outputSSD.innerHTML += "Replacement Costs: $" + aSSD[index]._replacementCost + "<br>";
        outputSSD.innerHTML += "Supplier: " + aSSD[index]._supplierName + "<br>";
        outputSSD.innerHTML += "Serial Number: " + aSSD[index]._serialNumber + "<br>";

        // Get the status by getter status()
        outputSSD.innerHTML += "Status: " + aSSD[index].status + "<br>";
        outputSSD.innerHTML += "Size: " + aSSD[index]._size + "<br>";
        outputSSD.innerHTML += "Transfer Rate: " + aSSD[index]._transferRate + "<br>";
        outputSSD.innerHTML += "Type: " + aSSD[index]._type + "<br>";
        outputSSD.innerHTML += "Wear Leveling: " + aSSD[index]._wearLeveling + "<br>";
    }
}

// Call the function to display VD
displayDevices(1, currentIndex);

// Call the function to display HD
displayDevices(2, currentIndexHD);

// Call the function to display SSD
displayDevices(3, currentIndexSSD);

// Function to get element by ID
function gel(id) {
    return document.getElementById(id);
}