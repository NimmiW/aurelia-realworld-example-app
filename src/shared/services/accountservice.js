import {inject} from 'aurelia-dependency-injection';
import {ApiService} from './apiservice';

@inject(ApiService)
export class AccountService {

  constructor(apiService) {
    this.apiService = apiService;
  }
  
  getBalance(params) {
    return this.apiService.get('/Balance',params)
  }
  
  get(slug) {
    return this.apiService.get('/articles/' + slug)
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
