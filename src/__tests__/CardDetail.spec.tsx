import { Skill } from '@/domain/class/Skill';
import { User } from '@/domain/class/User';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

const mockUserRecord = vi.hoisted(() => ({
  id: 'sample',
  name: 'テスト太郎',
  description: '<h1>テスト太郎の自己紹介です</h1>',
  github_id: 'test-github',
  qiita_id: 'test-qiita',
  x_id: 'test-x',
  user_skill: [
    {
      skills: {
        id: 1,
        name: 'React',
      },
    },
  ],
}));

vi.mock('@/lib/supabase/databases/user', () => ({
  selectUserById: vi.fn().mockResolvedValue(
    User.create({
      id: mockUserRecord.id,
      name: mockUserRecord.name,
      description: mockUserRecord.description,
      githubId: mockUserRecord.github_id,
      qiitaId: mockUserRecord.qiita_id,
      xId: mockUserRecord.x_id,
      skill: new Skill(mockUserRecord.user_skill[0].skills.id, mockUserRecord.user_skill[0].skills.name),
    })
  ),
}));

const mockedNavigate = vi.hoisted(() => vi.fn());
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: vi.fn().mockReturnValue({ userId: mockUserRecord.id }),
  };
});

import { CardDetail } from '@/components/pages/CardDetail';
import { Provider } from '@/components/ui/provider';

describe('名刺詳細ページのテスト', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('ユーザー名が表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const userName = await screen.findByRole('heading', { level: 1, name: mockUserRecord.name });
    expect(userName).toBeVisible();
  });

  it('自己紹介が表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const definition = await screen.findByText('テスト太郎の自己紹介です');
    expect(definition).toContainHTML(mockUserRecord.description);
  });

  it('技術が表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const skill = await screen.findByText(mockUserRecord.user_skill[0].skills.name);
    expect(skill).toBeVisible();
  });

  it('Githubアイコンが表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const link = await screen.findByRole('link', { name: 'Githubアイコン' });
    const icon = within(link).getByRole('img', { hidden: true });
    expect(icon).toBeVisible();
  });

  it('Qiitaアイコンが表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const link = await screen.findByRole('link', { name: 'Qiitaアイコン' });
    const icon = within(link).getByRole('img', { hidden: true });
    expect(icon).toBeVisible();
  });

  it('Xアイコンが表示されていること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const link = await screen.findByRole('link', { name: 'Xアイコン' });
    const icon = within(link).getByRole('img', { hidden: true });
    expect(icon).toBeVisible();
  });

  it('戻るボタンを押すと、トップページに遷移されること', async () => {
    render(
      <MemoryRouter initialEntries={[`/cards/${mockUserRecord.id}`]}>
        <Provider>
          <CardDetail />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const backButton = await screen.findByRole('button', { name: '戻る' });
    await user.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
