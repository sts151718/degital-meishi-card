import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/lib/supabase/databases/skill', () => ({
  selectAllSkills: vi.fn(),
}));

import { Top } from '@/components/pages/Top';
import { Provider } from '@/components/ui/provider';
import { CardRegister } from '@/components/pages/CardRegister';

describe('トップページのテスト', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('タイトルが表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider>
          <Top />
        </Provider>
      </MemoryRouter>
    );

    const title = await screen.findByRole('heading', { level: 1, name: 'デジタル名刺' });
    expect(title).toBeVisible();
  });

  it('名刺詳細ページに遷移されること', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider>
          <Top />
        </Provider>
      </MemoryRouter>
    );

    const user = UserEvent.setup();
    const idInput = screen.getByRole('textbox', { name: 'ID' });
    const submitButton = screen.getByRole('button', { name: '名刺を見る' });

    const idValue = 'testid';
    await user.type(idInput, idValue);
    await user.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/cards/${idValue}`);
  });

  it('IDを入力せずにsubmitボタンを押すと、エラーが表示されること', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider>
          <Top />
        </Provider>
      </MemoryRouter>
    );

    const user = UserEvent.setup();
    const submitButton = screen.getByRole('button', { name: '名刺を見る' });

    await user.click(submitButton);

    const error = screen.getByText('IDは必須項目です。');
    expect(error).toBeVisible();
  });

  it('名刺登録ページ', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/cards/register" element={<CardRegister />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const user = UserEvent.setup();
    const registerLink = screen.getByRole('link');

    await user.click(registerLink);

    // ページ遷移されたことをテストする。
    expect(screen.getByTestId('register-page')).toBeInTheDocument();
  });
});
