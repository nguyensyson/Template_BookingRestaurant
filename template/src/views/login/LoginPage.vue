<template>
	<v-sheet rounded>
		<v-card class="mx-auto px-6 py-8" max-width="344">
			<h3 class="text-center">Đăng nhập</h3>
			<br/>
			<v-form class="mb-5" @submit.prevent="login">
				<v-text-field
					v-model="authRequest.username"
					:rules="usernameRule"
					class="mb-2"
					clearable
					label="Tài khoản"
				></v-text-field>

				<v-text-field
					v-model="authRequest.password"
					:rules="passwordRule"
					clearable
					label="Password"
					placeholder="Enter your password"
					:type="'password'"
				></v-text-field>

				<br>

				<v-btn
					color="success"
					size="large"
					type="submit"
					variant="elevated"
				>
					Sign In
				</v-btn>
			</v-form>
		</v-card>
	</v-sheet>
	<footer-component/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {AuthRequest} from "@/base/client/request/auth.request";
import FooterComponent from "@/components/footer/Footer.vue";
import {AuthService} from "@/base/service/auth.service";
export default defineComponent({
	name: "LoginPage",
	components: {FooterComponent},
	computed: {
		authService() {
			return new AuthService()
		}
	},
	data: () => ({
		authRequest: new AuthRequest(),
		// add rule
		usernameRule: [
			(v: any) => !!v || 'Tài khoản là bắt buộc',
			(v: any) => (v && v.length <= 10) || 'Tài khoản phải nhỏ hơn 10 ký tự',
		],
		passwordRule: [
			(v: any) => !!v || 'Mật khẩu là bắt buộc',
			(v: any) => (v && v.length <= 10) || 'Mật khẩu phải nhỏ hơn 10 ký tự',
		],
	}),
	methods: {
		login() {
			this.authService.login(this.authRequest).then((res) => {
				this.$router.push('/');
				localStorage.setItem('token', res.data.access_token);
				localStorage.setItem('isLogin', 'true');
			}).catch((err) => {
				console.log(err)
			})
		}
	}
})

</script>