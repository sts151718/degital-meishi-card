import { Skill } from '@/domain/class/Skill';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

vi.mock('@/lib/supabase/databases/user', () => ({
  insertUser: vi.fn(),
}));

const mockSkills = vi.hoisted(() => [
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Github' },
]);
vi.mock('@/lib/supabase/databases/skill', () => ({
  selectAllSkills: vi
    .fn()
    .mockImplementation(() => Promise.resolve(mockSkills.map((skill) => new Skill(skill.id, skill.name)))),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { CardRegister } from '@/components/pages/CardRegister';
import { Provider } from '@/components/ui/provider';

describe('名刺登録ページのテスト', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('タイトルが表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const title = await screen.findByRole('heading', { level: 1, name: '名刺新規登録' });
    expect(title).toBeVisible();
  });

  it('全項目を入力して、登録ボタンを押した後、トップページに遷移されること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const form = await screen.findByRole('form');

    await user.type(within(form).getByRole('textbox', { name: '好きな英単語' }), 'testId');
    await user.type(within(form).getByRole('textbox', { name: 'お名前' }), 'テスト太郎');
    await user.type(within(form).getByRole('textbox', { name: '自己紹介' }), '<h1>テスト太郎の自己紹介です</h1>');
    await user.selectOptions(within(form).getByRole('combobox', { name: '好きな技術' }), 'React');
    await user.type(within(form).getByRole('textbox', { name: 'GitHub ID' }), 'test-github');
    await user.type(within(form).getByRole('textbox', { name: 'Qiita ID' }), 'test-qiita');
    await user.type(within(form).getByRole('textbox', { name: 'X ID' }), 'test-x');

    await user.click(screen.getByRole('button', { name: '登録' }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('IDが入力されていないときにエラーメッセージがでること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const form = await screen.findByRole('form');

    await user.type(within(form).getByRole('textbox', { name: 'お名前' }), 'テスト太郎');
    await user.type(within(form).getByRole('textbox', { name: '自己紹介' }), '<h1>テスト太郎の自己紹介です</h1>');
    await user.selectOptions(within(form).getByRole('combobox', { name: '好きな技術' }), 'React');
    await user.type(within(form).getByRole('textbox', { name: 'GitHub ID' }), 'test-github');
    await user.type(within(form).getByRole('textbox', { name: 'Qiita ID' }), 'test-qiita');
    await user.type(within(form).getByRole('textbox', { name: 'X ID' }), 'test-x');

    await user.click(screen.getByRole('button', { name: '登録' }));

    const error = within(form).getByText('好きな英単語は必須項目です。');
    expect(error).toBeVisible();
  });

  it('お名前が入力されていないときにエラーメッセージがでること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const form = await screen.findByRole('form');

    await user.type(within(form).getByRole('textbox', { name: '好きな英単語' }), 'testId');
    // await user.type(within(form).getByRole('textbox', { name: 'お名前' }), 'テスト太郎');
    await user.type(within(form).getByRole('textbox', { name: '自己紹介' }), '<h1>テスト太郎の自己紹介です</h1>');
    await user.selectOptions(within(form).getByRole('combobox', { name: '好きな技術' }), 'React');
    await user.type(within(form).getByRole('textbox', { name: 'GitHub ID' }), 'test-github');
    await user.type(within(form).getByRole('textbox', { name: 'Qiita ID' }), 'test-qiita');
    await user.type(within(form).getByRole('textbox', { name: 'X ID' }), 'test-x');

    await user.click(screen.getByRole('button', { name: '登録' }));

    const error = within(form).getByText('お名前は必須項目です。');
    expect(error).toBeVisible();
  });

  it('紹介文が入力されていないときにエラーメッセージがでること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const form = await screen.findByRole('form');

    await user.type(within(form).getByRole('textbox', { name: '好きな英単語' }), 'testId');
    // await user.type(within(form).getByRole('textbox', { name: '自己紹介' }), '<h1>テスト太郎の自己紹介です</h1>');
    await user.type(within(form).getByRole('textbox', { name: 'お名前' }), 'テスト太郎');
    await user.selectOptions(within(form).getByRole('combobox', { name: '好きな技術' }), 'React');
    await user.type(within(form).getByRole('textbox', { name: 'GitHub ID' }), 'test-github');
    await user.type(within(form).getByRole('textbox', { name: 'Qiita ID' }), 'test-qiita');
    await user.type(within(form).getByRole('textbox', { name: 'X ID' }), 'test-x');

    await user.click(screen.getByRole('button', { name: '登録' }));

    const error = within(form).getByText('自己紹介は必須項目です。');
    expect(error).toBeVisible();
  });

  it('好きな技術が選択されていないときエラーメッセージがでること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const form = await screen.findByRole('form');

    await user.type(within(form).getByRole('textbox', { name: '好きな英単語' }), 'testId');
    await user.type(within(form).getByRole('textbox', { name: '自己紹介' }), '<h1>テスト太郎の自己紹介です</h1>');
    await user.type(within(form).getByRole('textbox', { name: 'お名前' }), 'テスト太郎');
    // await user.selectOptions(within(form).getByRole('combobox', { name: '好きな技術' }), 'React');
    await user.type(within(form).getByRole('textbox', { name: 'GitHub ID' }), 'test-github');
    await user.type(within(form).getByRole('textbox', { name: 'Qiita ID' }), 'test-qiita');
    await user.type(within(form).getByRole('textbox', { name: 'X ID' }), 'test-x');

    await user.click(screen.getByRole('button', { name: '登録' }));

    const error = within(form).getByText('好きな技術は必須項目です。');
    expect(error).toBeVisible();
  });

  it('必須項目以外が入力されていなくても、登録されること', async () => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Provider>
          <CardRegister />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const form = await screen.findByRole('form');

    await user.type(within(form).getByRole('textbox', { name: '好きな英単語' }), 'testId');
    await user.type(within(form).getByRole('textbox', { name: '自己紹介' }), '<h1>テスト太郎の自己紹介です</h1>');
    await user.type(within(form).getByRole('textbox', { name: 'お名前' }), 'テスト太郎');
    await user.selectOptions(within(form).getByRole('combobox', { name: '好きな技術' }), 'React');
    // await user.type(within(form).getByRole('textbox', { name: 'GitHub ID' }), 'test-github');
    // await user.type(within(form).getByRole('textbox', { name: 'Qiita ID' }), 'test-qiita');
    // await user.type(within(form).getByRole('textbox', { name: 'X ID' }), 'test-x');

    await user.click(screen.getByRole('button', { name: '登録' }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
