import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

// NgEngine Module
import { NgEngineModule, NgEngineService } from '../../ngEngine'
// NgEngine Initial State
import * as ngEngineConfig from '../../root/app.ng-engine-config'
// Home Component
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let ngEngineService: NgEngineService
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgEngineModule.forRoot(ngEngineConfig.INITIAL_NG_ENGINE)
        // other imports
      ],
      declarations: [ HomeComponent ]
    }).compileComponents()
  }))

  beforeEach(() => {
    ngEngineService = TestBed.get(NgEngineService)
    spyOn(ngEngineService, 'dispatch').and.callThrough()
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should subscribe to published app state', async(() => {
    ngEngineService.dispatch('app', 'SetTitleAction', {title: 'Proxy Engine with Angular'})
    component.appState$.subscribe(data => {
      expect(data.title).toBe('Proxy Engine with Angular')
    })
  }))

  it('should set h1 as appState$.title', async(() => {
    ngEngineService.dispatch('app', 'SetTitleAction', {title: 'Proxy Engine with Angular'})
    component.appState$.subscribe(data => {
      fixture.whenStable().then(() => {
        fixture.detectChanges()
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('h1').textContent).toContain('Proxy Engine with Angular')
      })
    })
  }))

  it('should set h2 as homeState$.title', async(() => {
    ngEngineService.dispatch('home', 'HelloWorldAction', 'Hello World')
    component.homeState$.subscribe(data => {
      fixture.whenStable().then(() => {
        fixture.detectChanges()
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('h2').textContent).toContain('Hello World')
      })
    })
  }))
})
