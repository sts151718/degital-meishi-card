import { Box, Container, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { type FC } from 'react';
import { MainCard } from '../molecules/MainCard';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SecondaryButton } from '../atoms/button/SecondaryButton';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

type Inputs = {
  id: string;
};

export const Top: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const id = register('id', {
    required: {
      value: true,
      message: 'IDは必須項目です。',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const id = data.id;

    navigate(`/cards/${id}`);
  };

  return (
    <Container textAlign="center">
      <Heading as="h1" mb={6} size="3xl">
        デジタル名刺
      </Heading>
      <MainCard>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spaceY={4}>
            <Field.Root invalid={!!errors.id}>
              <Field.Label>ID</Field.Label>
              <Input {...id} />
              <Field.ErrorText>{errors.id?.message}</Field.ErrorText>
            </Field.Root>
            <SecondaryButton w="full" type="submit">
              名刺を見る
            </SecondaryButton>
          </Stack>
        </form>
      </MainCard>
      <Box mt={4}>
        <Link to="/cards/register">新規登録はこちら</Link>
      </Box>
    </Container>
  );
};
