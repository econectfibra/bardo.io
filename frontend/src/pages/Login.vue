<template>
  <q-layout class="vertical-center">
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <q-ajax-bar
          position="top"
          color="primary"
          size="5px"
        />
        <q-card
          bordered
          class="card q-pa-lg shadow-20"
          style="border-radius: 24px; background: rgba(255,255,255,0.98); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);"
        >
          <q-card-section class="text-primary text-center">
            <q-img
              src="/izing-logo_5_transparent.png"
              spinner-color="white"
              style="height: 120px; max-width: 300px"
              class="q-mb-lg"
            />
            <q-separator class="q-mb-lg" style="height: 2px; background: linear-gradient(to right, transparent, var(--q-primary), transparent)" />
          </q-card-section>
          <q-card-section class="text-primary q-pb-none">
            <div class="text-h5 text-weight-bold q-mb-sm">Bem-vindo de volta!</div>
            <div class="text-subtitle1 text-grey">Faça login para continuar</div>
          </q-card-section>

          <q-card-section class="q-pt-md">
            <q-input
              class="q-mb-md custom-input"
              clearable
              rounded
              v-model="form.email"
              placeholder="meu@email.com"
              @blur="$v.form.email.$touch"
              :error="$v.form.email.$error"
              error-message="Deve ser um e-mail válido."
              outlined
              @keypress.enter="fazerLogin"
            >
              <template v-slot:prepend>
                <q-icon
                  name="mdi-email-outline"
                  class="cursor-pointer text-primary"
                  size="sm"
                />
              </template>
            </q-input>

            <q-input
              class="custom-input"
              outlined
              rounded
              v-model="form.password"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Sua senha"
              @blur="$v.form.password.$touch"
              :error="$v.form.password.$error"
              error-message="Senha é obrigatória"
              @keypress.enter="fazerLogin"
            >
              <template v-slot:prepend>
                <q-icon
                  name="mdi-shield-key-outline"
                  class="cursor-pointer text-primary"
                  size="sm"
                />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="row justify-end q-mt-sm">
              <q-btn
                flat
                color="primary"
                no-caps
                dense
                class="q-px-sm text-weight-medium"
                label="Esqueci a senha"
                @click="modalEsqueciSenha=true"
              />
            </div>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              class="full-width q-py-sm"
              color="primary"
              rounded
              :loading="loading"
              style="font-size: 16px"
              @click="fazerLogin"
            >
              Entrar
              <template v-slot:loading>
                <q-spinner-puff class="on-left" />Entrando...
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>

        <q-dialog v-model="modalEsqueciSenha" persistent>
          <q-card style="min-width: 350px; border-radius: 16px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Recuperar senha</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="q-pt-md">
              <q-input
                outlined
                v-model="emailRedefinicao"
                label="E-mail"
                :error="$v.emailRedefinicao.$error"
                error-message="E-mail inválido"
                @blur="$v.emailRedefinicao.$touch"
                rounded
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-email-outline" color="primary" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancelar" v-close-popup />
              <q-btn flat label="Enviar" @click="enviarEmailRedefinicao" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-inner-loading :showing="loading" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      modalEsqueciSenha: false,
      emailRedefinicao: null,
      form: {
        email: null,
        password: null
      },
      contasCliente: {},
      isPwd: true,
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    },
    emailRedefinicao: { required, email }
  },
  methods: {
    fazerLogin () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Informe usuário e senha corretamente.')
        return
      }
      this.loading = true
      this.$store.dispatch('UserLogin', this.form)
        .then(data => {
          // if (Object.keys(this.contasCliente).length == 1) {
          //   // logar direto
          // }
          this.loading = false
          // .params = { modalEscolhaUnidadeNegocio: true }
        })
        .catch(err => {
          console.error('exStore', err)
          this.loading = false
        })
    },
    clear () {
      this.form.email = ''
      this.form.password = ''
      this.$v.form.$reset()
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
#login-app {
  background: none;
}

.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background: linear-gradient(135deg, #3E72AF 0%, #1E3C5F 100%);
  background-size: cover;
  overflow: hidden;
}

.card {
  width: 100%;
  max-width: 430px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3E72AF, #1E3C5F);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.custom-input :deep(.q-field__control) {
  height: 48px;
  font-size: 15px;
}

.custom-input :deep(.q-field__marginal) {
  height: 48px;
}

:deep(.q-field--outlined .q-field__control:before) {
  border-color: rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

:deep(.q-field--outlined:hover .q-field__control:before) {
  border-color: var(--q-primary);
  border-width: 2px;
}

:deep(.q-field--focused .q-field__control:before) {
  border-color: var(--q-primary);
  border-width: 2px;
  box-shadow: 0 0 0 2px rgba(62, 114, 175, 0.1);
}

:deep(.q-btn) {
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: none;
}

:deep(.q-btn--flat) {
  font-weight: 500;
}

:deep(.q-btn--flat:hover) {
  background: rgba(62, 114, 175, 0.1);
}

.q-img__image {
  background-repeat: no-repeat;
  background-size: contain;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.5s ease-out;
}

/* Efeito de brilho no card */
.card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* Estilo para o modal */
:deep(.q-dialog__inner) {
  padding: 0;
}

:deep(.q-card) {
  border-radius: 16px;
}

:deep(.q-card__section) {
  padding: 20px;
}

:deep(.q-card__actions) {
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.02);
}

/* Responsividade */
@media (max-width: 600px) {
  .card {
    margin: 20px;
    max-width: none;
  }
  .q-img {
    max-width: 250px;
  }
}
</style>
