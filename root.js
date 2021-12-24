const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

const vueObject = {
  name: "root",
  template:
    /*html*/
    `
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-dark text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="./refs/steering-wheel.png">
          </q-avatar>
          Pick Up Club
        </q-toolbar-title>
        
        <q-tabs align="center">
        <q-tab to="/page1" label="Посторить маршрут" @click="scrollTo('calculate')"/>
        <q-tab to="/page2" label="Отзывы" @click="scrollTo('feedback')"/>
        <q-tab to="/page3" label="Контакты" />
        </q-tabs>
        </q-toolbar>

    </q-header>

    <q-page-container>
      <!--Карусель-->
      <div class="q-pa-md">
        <q-carousel
          v-model="slide"
          vertical
          transition-prev="slide-down"
          transition-next="slide-up"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="400px"
          infinite
          class="bg-purple text-white shadow-1 rounded-borders"
          :autoplay="autoplay"
        >
          <q-carousel-slide name="1" class="column no-wrap flex-center" img-src="./refs/1.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">Лучшие водители</div>
              <div class="text-subtitle1">Мы тщательно подбираем кадры. Все водители проходят обязательную вакцинацию</div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="2" class="column no-wrap flex-center" img-src="./refs/2.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">Парк автомобилей</div>
              <div class="text-subtitle1">В вашем распоряжении разнообразный парк автомобилей</div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="3" class="column no-wrap flex-center" img-src="./refs/3.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">Лучший сервис</div>
              <div class="text-subtitle1">Наши постоянные клиенты ценят уровень комфорта и сервис, предоставялемый нашей компанией</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
 
      <!-- Калькулятор -->
      <div class="q-pa-none row justify-center items-start" id="calculate">
        <q-select class="q-pa-md" v-model="from" :options="fromOptions" label="Откуда" style="width:25%"/>
        <q-select class="q-pa-md" v-model="to" :options="toOptions" label="Куда" style="width:25%"/>
        <q-select class="q-pa-md" v-model="users" :options="usersOptions" label="Число пассажиров" style="width:20%"/>
      </div>

      <div class="q-pa-md row justify-center items-center" >
        <div class="text-h2 q-pa-md">{{sum}} руб.</div>
        <q-btn color="black" label="заказать" size="xl" v-if="sum>0" @click="makeOrder()"/>
      </div>

      <q-dialog v-model="shDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h4">Заказ зарегистрирован...</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="text-h7">В течение 10 минут с Вами свяжутся наши операторы для уточнения деталей заказа. Желаем приятной поездки</div>
        </q-card-section>
      </q-card>
    </q-dialog>

      <!-- Отзывы -->
      <div class="fit row wrap justify-center items-top content-start" id='feedback'>
        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar size="100px">
                <img src="./refs/u1.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Венера С.</q-item-label>
              <q-item-label caption>
                С нами с 2019
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card-section horizontal>
            <q-card-section>
            Пользовалась впервые, но обязательно буду 
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar size="100px">
                <img src="./refs/u2.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Алексей Н.</q-item-label>
              <q-item-label caption>
                С нами с 2020
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card-section horizontal>
            <q-card-section>
              Уже не в первый раз пользуюсь сервисом. Радует качество сервиса/ Удачи вам, ребята!
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar size="100px">
                <img src="./refs/u3.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Анастасия П.</q-item-label>
              <q-item-label caption>
                С нами с 2021
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card-section horizontal>
            <q-card-section>
              Часто езжу по работе. Иногда не успеваю забронирровтаь машину заранее. Здесь всегда найдется свободная машина!
            </q-card-section>
          </q-card-section>
        </q-card>
          
      </div>
      <div class="fit row wrap justify-center items-top content-start" id='feedback'>
      
      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="100px">
              <img src="./refs/u1.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Венера С.</q-item-label>
            <q-item-label caption>
              С нами с 2019
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section horizontal>
          <q-card-section>
          Пользовалась впервые, но обязательно буду 
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="100px">
              <img src="./refs/u2.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Алексей Н.</q-item-label>
            <q-item-label caption>
              С нами с 2020
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section horizontal>
          <q-card-section>
            Уже не в первый раз пользуюсь сервисом. Радует качество сервиса/ Удачи вам, ребята!
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="100px">
              <img src="./refs/u3.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Анастасия П.</q-item-label>
            <q-item-label caption>
              С нами с 2021
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section horizontal>
          <q-card-section>
            Часто езжу по работе. Иногда не успеваю забронирровтаь машину заранее. Здесь всегда найдется свободная машина!
          </q-card-section>
        </q-card-section>
      </q-card>
        
    </div>

    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="./refs/steering-wheel.png">
          </q-avatar>
          Pick Up Club
        </q-toolbar-title>
          <q-img src="./refs/insta7.png" style="height: 30px; max-width: 30px" onclick="window.open('https://www.instagram.com/damirmakhmudov')"/>
          <q-img src="./refs/insta6.png" style="height: 30px; max-width: 30px" onclick="window.open('https://www.instagram.com/damirmakhmudov')"/>
          <!--<div class="text-h4"><a href="https://www.instagram.com/damirmakhmudov"><q-icon name="folder"/></a></div>-->
          <!--<div class="text-h4" onclick="window.open('https://www.instagram.com/damirmakhmudov')">@instagram </div>-->
          <div class="text-h4">+7(927)1234567</div>
      </q-toolbar>
    </q-footer>

  </q-layout>

  `
  ,
  setup() {
    var sum = ref(computed(() => { return calculateSum(from, to, users) }))
    var from = ref(model.from)
    var to = ref(model.to)
    var users = ref(model.users)
    var shDialog = ref(false)

    function makeOrder() {
      from.value = 'Казань';
      to.value = '';
      users.value = 1;
      shDialog.value = true;
    }

    function scrollTo(direction) {
      const elo = document.getElementById(direction);
      elo.scrollIntoView(true);
    }

    function calculateSum(f, t, u) {
      if (f.value == "") return 0;
      if (t.value == "") return 0;
      return model.rules[`${f.value}-${t.value}`] * u.value
    }

    return {
      autoplay: ref(true),
      scrollTo,
      shDialog,
      makeOrder,
      from,
      to,
      calculateSum,
      slide: ref('1'),
      slidefeedback: ref('a'),
      fromOptions: ref(model.fromOptions),
      toOptions: ref(model.toOptions),
      usersOptions: ref(model.usersOptions),
      sum,
      users,
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
    }
  }
}

const app = Vue.createApp(vueObject);

app.use(Quasar, {
  config: {
    notify: {},
    loading: {}
  }
})