<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function should_新しいユーザーを作成して返却する()
    {
        $data = [
            'name' => 'vuesplash user',
            'email' => 'dummy@email.com',
            'password' => 'test1234',
            'password_confirmation' => 'test1234',
        ];
				//contrallerにpost送信
        $response = $this->json('POST', route('register'), $data);
				// contrllerで処理され（save）paramsを取得
				$user = User::first();
				// 取得したデータが存在するか
        $this->assertEquals($data['name'], $user->name);
				// レスポンスを返してstatus code200になるか
        $response
            ->assertStatus(201)
            ->assertJson(['name' => $user->name]);
    }
}
