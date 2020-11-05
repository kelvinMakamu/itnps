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
    "trend": {
        "NPSMonth": "Jan 2020",
        "NPSScore": 7
    }
  };

  getUserDashboardStatistics(): any{
    return this.stats;
  };

  constructor() { }
}
