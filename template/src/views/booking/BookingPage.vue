<script lang="ts">
import HeaderComponent from "@/components/header/Header.vue";
import FooterComponent from "@/components/footer/Footer.vue";
import {defineComponent} from "vue";
import BannerComponent from "@/components/banner/BannerComponent.vue";
import {ReservationRequest} from "@/base/client/request/reservation-request";
import {ReservationService} from "@/base/service/reservation-service";
import {CategoryDinningRomService} from "@/base/service/category-dinning-rom.service";
import {CategoryDinningRomModel} from "@/base/model/category-dinning-rom.model";
import {toast} from "vue3-toastify";
import type {ProductModel} from "@/base/model/product.model";
import {formatMoney} from "../../plugins/utils";

export default defineComponent({
	name: 'BookingPage',
	components: {
		HeaderComponent,
		FooterComponent,
		BannerComponent
	},
	data() {
		return {
			categoryDinnerRoom: [] as CategoryDinningRomModel[],
			reservationRequest: new ReservationRequest(),
			reservationService: new ReservationService(),
			categoryDinningRomService: new CategoryDinningRomService(),
			productList: [] as ProductModel[],
			totalPrice : 0 as number
		}
	},
	methods: {
		formatMoney,
		getAllDinnerRoom() {
			this.categoryDinningRomService.getAll().then(res => {
				this.categoryDinnerRoom = res.data;
			})
		},
		addByUser(status: number) {
			if (this.productList?.length === 0) {
				toast.error('Vui lòng chọn sản phẩm');
				return;
			}
			this.reservationRequest.status = status;
			this.reservationRequest.listPorduct = this.productList;
			this.reservationService.addByUser(this.reservationRequest).then(res => {
				toast.success(res?.data);
				localStorage.removeItem('cartList');
			})
		}
	},
	created() {
		this.getAllDinnerRoom();
		const listProduct = localStorage.getItem('cartList');
		this.productList = listProduct ? JSON.parse(listProduct) : [];
		this.totalPrice = this.productList.reduce((total, item) => total + item?.price * item.quantity, 0);
	}
})
</script>

<template>
	<div>
		<HeaderComponent/>
		<BannerComponent/>
		<div class="pt-7">
			<div class="container">
				<div class="row">
					<div class="col-md-7 col-sm-8 col-6">
						<h3 class="text-left">Thông tin khách hàng</h3>
						<v-form id="contact" class="border-1">
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field label="Họ và tên" outlined dense v-model="reservationRequest.fullname"></v-text-field>
									</v-col>
								</v-row>
								<v-row class="d-flex">
									<v-col cols="12" md="6">
										<v-text-field label="Điện thoại" outlined dense v-model="reservationRequest.sdt"></v-text-field>
									</v-col>

									<v-col cols="12" md="6">
										<v-select :items="categoryDinnerRoom" label="Chọn phòng" item-title="title" item-value="id" outlined v-model="reservationRequest.idCategoryDiningRoom"></v-select>
									</v-col>
								</v-row>
								<v-row class="d-flex">
									<v-col cols="12" md="6">
										<v-text-field dataformatas="dd/MM/yyyy HH:mm" type="datetime-local" label="Ngày và giờ check-in" v-model="reservationRequest.dateTime"></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field label="Số người tham gia" v-model="reservationRequest.numberOfPeopleBooked"></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<v-textarea label="Ghi chú" outlined rows="6" dense></v-textarea>
									</v-col>
								</v-row>
							</v-container>
						</v-form>
					</div>
					<div class="col-md-5 col-sm-4 col-6">
						<div class="your-order-area">
							<h3 class="text-uppercase">Đơn hàng</h3>
							<div class="your-order-wrap gray-bg-4">
								<div class="your-order-product-info">
									<div class="your-order-top">
										<ul class="d-flex justify-content-between">
											<li>Sản Phẩm</li>
											<li>Tổng</li>
										</ul>
									</div>
									<div class="your-order-middle">
										<ol>
											<li v-for="item in productList" class="d-flex justify-content-between">
												<span class="order-middle-left">{{item.name}} x {{item.quantity}}</span>
												<span class="order-price">{{formatMoney(item.price * item.quantity)}} VND</span>
											</li>
										</ol>
									</div>
									<div class="your-order-total">
										<ul>
											<li class="order-total">Tổng cộng</li>
											<li>
												<div style="display: none;">00</div>
												{{totalPrice}} VND
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="discount-code-wrapper mt-25">
								<div class="title-wrap">
									<h4 class="cart-bottom-title section-bg-gray">Mã giảm giá</h4>
								</div>
								<div class="discount-code">
									<p>Nhập mã giảm giá của bạn (nếu có).</p>
									<v-row>
										<v-col cols="12">
											<v-text-field v-model="reservationRequest.idVoucher" label="Mã giảm giá" outlined dense></v-text-field>
										</v-col>
									</v-row>
								</div>
							</div>
							<v-row>
								<v-col cols="12">
									<v-btn color="primary" @click.prevent="addByUser(1)">Đặt lịch không đặt cọc</v-btn>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-btn color="primary" @click.prevent="addByUser(2)">Đặt cọc online</v-btn>
								</v-col>
							</v-row>
						</div>
					</div>
				</div>
			</div>
		</div>
		<FooterComponent/>
	</div>
</template>

<style scoped lang="scss">
$xx-layout: "only screen and (min-width: 1366px) and (max-width: 1600px)";
$xl-layout: "only screen and (min-width: 1200px) and (max-width: 1365px)";
$lg-layout: "only screen and (min-width: 992px) and (max-width: 1199px)";
$md-layout: "only screen and (min-width: 768px) and (max-width: 991px)";
$xs-layout: "only screen and (max-width: 767px)";
$sm-layout: "only screen and (min-width: 576px) and (max-width: 767px)";
$xxs-layout: "only screen and (min-width: 320px) and (max-width: 479px)";
/*------- 21. Checkout page  -----------*/
.billing-info-wrap {
	h3 {
		font-size: 20px;
		font-weight: 500;

		margin: 0 0 20px;

		color: #000;
	}

	.billing-info,
	.billing-select {
		label {
			margin: 0 0 7px;

			color: #000;
		}

		input {
			font-size: 14px;

			padding-right: 10px;
			padding-left: 20px;

			color: #333;
			border: 1px solid #e6e6e6;
			background: transparent none repeat scroll 0 0;
		}

		input.billing-address {
			margin-bottom: 10px;
		}
	}

	.billing-select {
		select {
			font-size: 14px;

			height: 45px;
			padding: 2px 20px;
			cursor: pointer;
			color: #333;
			border: 1px solid #e6e6e6;
		}
	}

	.checkout-account {
		display: flex;
		align-items: center;

		input {
			display: inline-block;
			float: left;

			width: 10px;
			height: 10px;

			border: 1px solid #9fa0a2;
		}

		span {
			font-weight: 400;

			margin: 0 0 0 12px;

			color: #333;
		}
	}

	.checkout-account-toggle {
		input {
			font-size: 14px;

			margin: 0 0 20px;
			padding-right: 10px;
			padding-left: 20px;

			color: #333;
			border: 1px solid #e6e6e6;
			background: transparent none repeat scroll 0 0;
		}

		button.checkout-btn {
			font-weight: 500;

			z-index: 9;

			padding: 10px 30px;

			cursor: pointer;
			text-transform: uppercase;

			color: #fff;
			border: medium none;
			border-radius: 50px;
			background-color: #f58634;

			&:hover {
				background-color: #333;
			}
		}
	}

	.additional-info-wrap {
		h4 {
			font-size: 16px;
			font-weight: 500;
		}

		.additional-info {
			label {
				font-size: 14px;

				margin: 0 0 7px;

				color: #333;
			}

			textarea {
				font-size: 14px;

				height: 138px;
				padding: 17px 20px;

				color: #333;
				border: 1px solid #e6e6e6;
				background: transparent none repeat scroll 0 0;
			}
		}
	}

	.different-address {
		display: none;
	}
}

.your-order-area {
	@media #{$md-layout} {
		margin-top: 30px;
	}
	@media #{$xs-layout} {
		margin-top: 30px;
	}

	h3 {
		font-size: 20px;
		font-weight: 500;

		margin: 0 0 20px;

		color: #000;
	}

	.your-order-wrap {
		padding: 38px 45px 44px;

		background: #f6f6f6;
		@media #{$lg-layout} {
			padding: 30px 20px 36px;
		}
		@media #{$xs-layout} {
			padding: 30px 20px 36px;
		}

		.your-order-product-info {
			.your-order-top {
				ul {
					display: flex;
					justify-content: space-between;

					li {
						font-size: 16px;
						font-weight: 500;

						list-style: outside none none;
					}
				}
			}

			.your-order-middle {
				margin: 29px 0;
				padding: 19px 0 18px;

				border-top: 1px solid #dee0e4;
				border-bottom: 1px solid #dee0e4;

				ul {
					li {
						display: flex;
						justify-content: space-between;

						margin: 0 0 10px;
					}
				}
			}

			.your-order-bottom {
				ul {
					display: flex;
					align-items: center;
					justify-content: space-between;

					li {
						font-size: 14px;
						font-weight: 400;

						list-style: none;
					}

					li.your-order-shipping {
						font-size: 16px;
						font-weight: 400;

						color: #212121;
					}
				}
			}

			.your-order-total {
				margin: 18px 0 33px;
				padding: 17px 0 19px;

				border-top: 1px solid #dee0e4;
				border-bottom: 1px solid #dee0e4;

				ul {
					display: flex;
					align-items: center;
					justify-content: space-between;

					li.order-total {
						font-size: 18px;
						font-weight: 500;

						color: #212121;
					}

					li {
						font-size: 16px;
						font-weight: 500;

						list-style: outside none none;

						color: #f58634;
					}
				}
			}
		}
	}

	.payment-accordion {
		margin: 0 0 16px;

		&:last-child {
			margin: 0 0 0;
		}

		h4 {
			font-size: 16px;

			margin: 0;

			color: #212121;

			a {
				position: relative;

				display: block;

				color: #212121;

				&:hover {
					color: #f58634;
				}
			}
		}

		.panel-body {
			padding: 5px 0 0 0;

			p {
				font-size: 14px;

				padding: 0 0 0 10px;

				color: #333;
			}
		}
	}

	.place-order > a,
	.place-order > button {
		font-weight: 500;
		line-height: 1;

		z-index: 9;

		display: block;

		width: 100%;
		padding: 18px 20px;

		text-align: center;
		letter-spacing: 1px;
		text-transform: uppercase;

		color: #fff;
		border: none;
		border-radius: 50px;
		background: none;
		background-color: #f58634;

		&:hover {
			background-color: #333;
		}
	}
}

.checkout-area {
	@media #{$xs-layout} {
		&.pb-100 {
			padding-bottom: 60px;
		}
	}
}

</style>