import type { Database } from '@/lib/supabase/database';

interface IUserInputRequired {
  id: string;
  name: string;
  description: string;
  skillId: string;
}

interface IUserInputNullable {
  readonly githubId: string | null;
  readonly qiitaId: string | null;
  readonly xId: string | null;
}

export interface IUserInput extends IUserInputRequired, IUserInputNullable {}

export interface IUserCreateInput extends IUserInputRequired, Partial<IUserInputNullable> {}

export class UserInput implements IUserInput {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly skillId: string;
  public readonly githubId: string | null;
  public readonly qiitaId: string | null;
  public readonly xId: string | null;

  private constructor(
    id: string,
    name: string,
    description: string,
    skillId: string,
    githubId: string | null,
    qiitaId: string | null,
    xId: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.skillId = skillId;
    this.githubId = githubId;
    this.qiitaId = qiitaId;
    this.xId = xId;
  }

  public static fromCreateForm = (form: IUserCreateInput) => {
    return new UserInput(
      form.id,
      form.name,
      form.description,
      form.skillId,
      form.githubId ?? null,
      form.qiitaId ?? null,
      form.xId ?? null
    );
  };

  public toUserAndUserSkillsData = (): Database['public']['Functions']['insert_user_and_userskill']['Args'] => {
    const insertData = {
      _id: this.id,
      _name: this.name,
      _description: this.description,
      _skill_id: Number(this.skillId),
    } as Database['public']['Functions']['insert_user_and_userskill']['Args'];
    if (this.githubId) {
      insertData['_github_id'] = this.githubId;
    }
    if (this.qiitaId) {
      insertData['_qiita_id'] = this.qiitaId;
    }
    if (this.xId) {
      insertData['_x_id'] = this.xId;
    }

    return insertData;
  };
}
