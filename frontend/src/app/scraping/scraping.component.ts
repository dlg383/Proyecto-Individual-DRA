import { Component } from '@angular/core';
import { IPhone15 } from '../scraping';
import { ScrapingService } from '../scraping.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scraping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scraping.component.html',
  styleUrl: './scraping.component.css'
})
export class ScrapingComponent {
  iphoneData: IPhone15[] = [];
  errorMessage: string = '';

  constructor(private scrapingService: ScrapingService) { }

  ngOnInit(): void {
    this.getScraping();
  }

  getScraping(){
    this.scrapingService.getIPhone15Data().subscribe(
      data => {
        this.iphoneData = data;
      },
      error => {
        this.errorMessage = error;
        console.error('Error fetching iPhone 15 data:', error);
      }
    );
  }
}
