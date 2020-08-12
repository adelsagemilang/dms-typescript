import * as React from 'react';
import { connect } from 'react-redux';
import {
  Columns,
  Column,
  Label,
  Control,
  Title,
  Subtitle,
  Input,
  Notification,
} from 'bloomer';
import * as Yup from 'yup';
import { Delete } from 'bloomer/lib/elements/Delete';
import { storeData } from 'store/login/actions';
import TogglePassword from 'components/plugins/toggle-password';
import { Formik, Form, Field } from 'formik';
import { LoginAuth } from 'store/login/types';
import { ApplicationState } from 'store/rootState';
import 'styles/sass/pages/login.sass';
import { getDataInit as getInitViewSetting } from 'store/setting-filter/actions';

export interface PropsFromDispatch {
  storeData?: typeof storeData;
}

interface PropsFromState {
  errors?: string;
  loading?: boolean;
}

interface FormData {
  email: string;
  password: string;
}

type AllProps = PropsFromDispatch & PropsFromState;
class FormLogin extends React.Component<AllProps, FormData & PropsFromState> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  errorNotif(errors: any, formikBag: any) {
    return (
      <>
        <>{this.openNotif(formikBag)}</>
        <Notification id="notif-error" isColor="danger">
          <Delete onClick={e => this.closeNotif(e)} />
          {errors}
        </Notification>
      </>
    );
  }

  closeNotif(ev: any) {
    ev.nativeEvent.target.parentNode.hidden = true;
  }

  openNotif(formikBag: any) {
    if (formikBag.isSubmitting) {
      const notifElement = document.getElementById('notif-error');
      if (notifElement) {
        notifElement.hidden = false;
      }
    }
  }

  public render() {
    const initialValues: FormData = { email: '', password: '' };
    const { errors, loading } = this.props;
    const SignupSchema = Yup.object().shape({
      password: Yup.string().required('Password is required'),
      email: Yup.string().required('Email or Phone is required'),
    });

    return (
      <>
        <Columns isCentered>
          <Column isSize="1/2" hasTextAlign="left">
            <Column hasTextAlign="centered">
              <img src="./images/logo.png" id="logo" alt="logo" />
            </Column>

            <Title>Hello,</Title>

            <Subtitle>Welcome to DMS</Subtitle>

            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={(values: LoginAuth, actions) => {
                if (getInitViewSetting) {
                  getInitViewSetting();
                }
                const { storeData } = this.props;
                if (storeData) storeData(values);
                actions.setSubmitting(false);
              }}
            >
              {formikBag => (
                <>
                  {errors ? <>{this.errorNotif(errors, formikBag)}</> : ''}

                  <Form>
                    <Label>Email or No. Handphone</Label>
                    <Control>
                      <Field name="email">
                        {({ field, form, meta }: any) => (
                          <>
                            <Input
                              name="email"
                              type="text"
                              placeholder="e.g. email@logan.co.id"
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </Control>

                    <Label className="m-t-20">Password</Label>
                    <Control>
                      <Field name="password">
                        {({ field, form, meta }: any) => (
                          <>
                            <TogglePassword
                              password=""
                              name="password"
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </Control>

                    <Control className="m-t-20">
                      <button
                        type="submit"
                        className="button is-info is-fullwidth m-t-20"
                        disabled={loading}
                      >
                        {loading ? `Please wait...` : `Login`}
                      </button>
                    </Control>
                  </Form>
                </>
              )}
            </Formik>
          </Column>
        </Columns>
      </>
    );
  }
}

const mapDispatchToProps: PropsFromDispatch = {
  storeData,
};

const mapStateToProps = ({ login }: ApplicationState) => ({
  errors: login.errors,
  loading: login.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
