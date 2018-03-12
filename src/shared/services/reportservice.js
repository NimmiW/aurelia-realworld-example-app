import {inject} from 'aurelia-dependency-injection';
import {ApiService} from './apiservice';

@inject(ApiService)
export class ReportService {

  constructor(apiService) {
    this.apiService = apiService;
  }
  
  getReport(params) {
    return this.apiService.get2('/5aa5e408310000fb07e7134a', params)
  }
  
  get(slug) {
    return this.apiService.get2('/5aa5e408310000fb07e7134a' + slug)
      .then(data => data.article)
  }
  
  destroy(slug) {
    return this.apiService.delete('/articles/' + slug)
  }
  
  save(article) {
    if (article.slug) {
      // If we're updating an existing article
      return this.apiService.put('/articles/' + article.slug, {article: article})
        .then(data => data.article)
    } else {
      // Otherwise, create a new article
      return this.apiService.post('/articles/', {article: article})
        .then(data => data.article)
    }
  }
  
  favorite(slug) {
    return this.apiService.post('/articles/' + slug + '/favorite')
  }
  
  unfavorite(slug) {
    return this.apiService.delete('/articles/' + slug + '/favorite')
  }
  
}
