class PWADemoApp {
  constructor() {
    this.scheduleDiv = document.querySelector(".schedule");
    this.init();
  }

  async init() {
    this.loadSchedule();
    this.registerSW();
  }

  async loadSchedule() {
    const rawSchedule = await this.fetchJSON("./schedule.json");

    // Add speaker details to array
    // this.schedule = rawSchedule.map(this.addSpeakerDetails, this);
    this.scheduleDiv.innerHTML = rawSchedule
      .map(this.toScheduleBlock)
      .join("\n");
  }

  toScheduleBlock(scheduleItem) {
    return `
      <div class="schedule-item ${scheduleItem.category}">
        <div class="title-and-time">
          <div class="time">${scheduleItem.startTime}</div>
          <div class="title-and-speaker">
            <div class="title">${scheduleItem.title}</div>
            <div class="speaker">${
              scheduleItem.speaker ? scheduleItem.speaker.name : "&nbsp;"
            }</div>
          </div>
        </div>
        <p class="description">${scheduleItem.description}</p>
      </div>
    `;
  }

  async fetchJSON(url) {
    const res = await fetch(url);
    return res.json();
  }

  async registerSW() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("./sw.js");
      } catch (e) {
        alert("ServiceWorker registration failed. Sorry about that.");
      }
    } else {
      document.querySelector(".alert").removeAttribute("hidden");
    }
  }
}

window.addEventListener("load", (e) => {
  new PWADemoApp();
});
