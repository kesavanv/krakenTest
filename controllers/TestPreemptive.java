import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScheme;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.AuthState;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.ExecutionContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

/**
 * Simple class to launch a jenkins build on run@Cloud platform, should also work on every jenkins instance (not tested).
 *
 */
public class TestPreemptive {

	public static void main(String[] args) {
        String jobName = "arun_build01";
        String task = "build";
        String streamName = "spec_xmlreg";
        String lab = "vpslablvs052_l";

        if(args.length>0 && args[0] != null) {
           jobName = args[0];
        }
        if(args.length>1 && args[1] != null) {
           task = args[1];
        }
        if(args.length>2 && args[2] != null) {
           streamName = args[2];
        }
        if(args.length>3 && args[3] != null) {
           lab = args[3];
        }

        new TestPreemptive().processRequest(jobName, task, streamName, lab);
    }




    public void processRequest(String jobName, String task, String streamName, String lab ) {

        // https://arramakrishnan:build@fusion.paypal.com/jenkins/job/arun_build01/build
        // https://fusion.paypal.com/jenkins/job/arun_build01/build
        // Credentials
		String username = "arramakrishnan"; //"YOUR_USERNAME";
		String password = "Escape999$"; //"YOUR_PASSWORD";
        String buildToken = "build";
		// Jenkins url
		String jenkinsUrl = "https://fusion.paypal.com/jenkins"; // "JENKINS_URL";

		// Build name
		//String jobName = "mohan_deploy";//"arun_build01";//"vijaybuild"; //"JOB";

		// Build token
		//String buildToken = "build"; //"BUILD_TOKEN";

       // String streamName = "spec_xmlreg";

        //String lab = "vpslablvs052_l";

        // Create your httpclient
		DefaultHttpClient client = new DefaultHttpClient();


        //client = new DefaultHttpClient();
        if (true) {
            client = WebClientDevWrapper.wrapClient(client);
        }

        // Then provide the right credentials
		client.getCredentialsProvider().setCredentials(new AuthScope(AuthScope.ANY_HOST, AuthScope.ANY_PORT),
				new UsernamePasswordCredentials(username, password));

		// Generate BASIC scheme object and stick it to the execution context
		BasicScheme basicAuth = new BasicScheme();
		BasicHttpContext context = new BasicHttpContext();
		context.setAttribute("preemptive-auth", basicAuth);

		// Add as the first (because of the zero) request interceptor
		// It will first intercept the request and preemptively initialize the authentication scheme if there is not
		client.addRequestInterceptor(new PreemptiveAuth(), 0);

		// You get request that will start the build
		//String getUrl = jenkinsUrl + "/job/" + jobName + "/build?token=" + buildToken;
        String getUrl = jenkinsUrl + "/job/" + jobName + "/buildWithParameters?token=" + buildToken + "&BRANCH=" + streamName;

        if("deploy".equals(task))
            getUrl += "&LAB=" + lab;

        HttpGet get = new HttpGet(getUrl);

		try {
			// Execute your request with the given context
			HttpResponse response = client.execute(get, context);
			HttpEntity entity = response.getEntity();
			EntityUtils.consume(entity);
            if (response != null && response.getStatusLine() != null) {
                if (response.getStatusLine().getStatusCode() == 200)
                    System.out.println("success");
            }
            else{System.out.println("failure");}
        }
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


    }

    /**
	 * Preemptive authentication interceptor
	 *
	 */
	static class PreemptiveAuth implements HttpRequestInterceptor {

		/*
		 * (non-Javadoc)
		 *
		 * @see org.apache.http.HttpRequestInterceptor#process(org.apache.http.HttpRequest,
		 * org.apache.http.protocol.HttpContext)
		 */
		public void process(HttpRequest request, HttpContext context) throws HttpException, IOException {
			// Get the AuthState
			AuthState authState = (AuthState) context.getAttribute(ClientContext.TARGET_AUTH_STATE);

			// If no auth scheme available yet, try to initialize it preemptively
			if (authState.getAuthScheme() == null) {
				AuthScheme authScheme = (AuthScheme) context.getAttribute("preemptive-auth");
				CredentialsProvider credsProvider = (CredentialsProvider) context
						.getAttribute(ClientContext.CREDS_PROVIDER);
				HttpHost targetHost = (HttpHost) context.getAttribute(ExecutionContext.HTTP_TARGET_HOST);
				if (authScheme != null) {
					Credentials creds = credsProvider.getCredentials(new AuthScope(targetHost.getHostName(), targetHost
							.getPort()));
					if (creds == null) {
						throw new HttpException("No credentials for preemptive authentication");
					}
					authState.setAuthScheme(authScheme);
					authState.setCredentials(creds);
				}
			}

		}

	}
}
