import { Container, Field, Heading, Input, NativeSelect, Stack, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState, type FC } from 'react';
import { MainCard } from '../molecules/MainCard';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useSkillAll } from '@/hooks/useSkillAll';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { UserInput, type IUserCreateInput } from '@/domain/class/UserInput';
import { insertUser } from '@/lib/supabase/databases/user';
import { useNavigate } from 'react-router';

export const CardRegister: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { skills, fetchAllSkills } = useSkillAll();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>();

  const navigate = useNavigate();

  const id = register('id', {
    required: {
      value: true,
      message: '好きな英単語は必須項目です。',
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: 'アルファベットのみ入力可能です。',
    },
  });

  const name = register('name', {
    required: {
      value: true,
      message: 'お名前は必須項目です。',
    },
  });
  const description = register('description', {
    required: {
      value: true,
      message: '自己紹介は必須項目です。',
    },
  });
  const skillId = register('skillId', {
    required: {
      value: true,
      message: '好きな技術は必須項目です。',
    },
  });
  const githubId = register('githubId');
  const qiitaId = register('qiitaId');
  const xId = register('xId');

  useEffect(() => {
    (async () => {
      try {
        await fetchAllSkills();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<IUserCreateInput> = async (data) => {
    setIsLoading(true);
    const input = UserInput.fromCreateForm(data);

    try {
      await insertUser(input);

      navigate('/');
    } catch (error) {
      alert('登録に失敗しました。');
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Container textAlign="center" data-testid="register-page">
      <Heading as="h1" mb="6" size="3xl">
        名刺新規登録
      </Heading>
      <MainCard>
        <form role="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spaceY={4}>
            <Field.Root required invalid={!!errors.id}>
              <Field.Label fontSize="md">
                好きな英単語
                <Field.RequiredIndicator fontSize="md" />
              </Field.Label>
              <Input {...id} />
              <Field.ErrorText>{errors.id?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.name}>
              <Field.Label fontSize="md">
                お名前
                <Field.RequiredIndicator fontSize="md" />
              </Field.Label>
              <Input {...name} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.description}>
              <Field.Label fontSize="md">
                自己紹介
                <Field.RequiredIndicator fontSize="md" />
              </Field.Label>
              <Textarea {...description} placeholder="HTMLで記述できます" h="36" />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.skillId}>
              <Field.Label fontSize="md">
                好きな技術
                <Field.RequiredIndicator fontSize="md" />
              </Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field {...skillId}>
                  <option value=""></option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator fontSize="md" />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.skillId?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label fontSize="md">GitHub ID</Field.Label>
              <Input {...githubId} />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label fontSize="md">Qiita ID</Field.Label>
              <Input {...qiitaId} />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label fontSize="md">X ID</Field.Label>
              <Input {...xId} placeholder="@は不要" />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>
            <Text>*は必須項目です。</Text>
            <PrimaryButton type="submit" disabled={isLoading} loading={isLoading}>
              登録
            </PrimaryButton>
          </Stack>
        </form>
      </MainCard>
    </Container>
  );
};
