import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  stats: any = {
    "totalTNPS": {
        "promoters": 20,
        "detractors": 40,
        "percentNPS": -20
    },
    "issuesResolution": {
        "positive": 60,
        "negative": 40
    },
    "detractors": {
        "percent": 40
    },
    "promoters": {
        "percent": 20
    },
    "trend": [
      {
        "NPSMonth": "Jan 2020",
        "NPSScore": -20,
        "promoters": 20,
        "detractors": 40
      },
      {
        "NPSMonth": "Feb 2020",
        "NPSScore": 0,
        "promoters": 40,
        "detractors": 40
      },
      {
        "NPSMonth": "Mar 2020",
        "NPSScore": 20,
        "promoters": 56,
        "detractors": 40
      },
      {
        "NPSMonth": "Apr 2020",
        "NPSScore": 40,
        "promoters": 55,
        "detractors": 15
      },
      {
        "NPSMonth": "May 2020",
        "NPSScore": 10,
        "promoters": 50,
        "detractors": 40
      },
      {
        "NPSMonth": "June 2020",
        "NPSScore": -5,
        "promoters": 35,
        "detractors": 40
      },
      {
        "NPSMonth": "July 2020",
        "NPSScore": -7,
        "promoters": 33,
        "detractors": 40
      },
  ]
  };

  getUserDashboardStatistics(): any{
    console.log("Data", this.stats.trend);
    return this.stats;
  };

  constructor() { }
}
